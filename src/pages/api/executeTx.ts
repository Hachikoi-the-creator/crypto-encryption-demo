import { accountsArray } from "@/data/accounts";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import type { NextApiRequest, NextApiResponse } from "next";

type Tx = {
  sender: string;
  amount: string;
  recipient: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { signedHashHex, tx, txHash, publicKey } = req.body;
    // not all needed info was sent
    if (!(signedHashHex || txHash || publicKey || tx)) {
      res.status(402).send("incomplete data");
      return;
    }

    const isVerified = secp256k1.verify(signedHashHex, txHash, publicKey);
    if (!isVerified) {
      res.send({ status: "error", msg: "invalid tx" });
      return;
    }

    const executionSuccessful = executeTx(tx);
    if (!executionSuccessful) {
      res.send({
        status: "error",
        msg: "tbh dunno what could have been wrong",
      });
      return;
    }

    const updatedData = getUpdatedValues(tx);
    res.status(201).send({ status: "success", updatedData });
    // dont get it why I need it but without it, gives error of responding twice
    return;
  }
  // needs to exist otherwise may cause staled req
  res.status(400).send("invalid endpoint");
}

function executeTx(tx: any) {
  const validInputs = validateTxValues(tx);
  if (!validInputs) return false;

  // check if users exist
  const senderIdx = accountsArray.findIndex((acc) => acc.name === tx.sender);
  const recipientIdx = accountsArray.findIndex(
    (acc) => acc.name === tx.recipient
  );
  if (senderIdx === -1 || recipientIdx === -1) return false;

  const sender = accountsArray[senderIdx];
  const recipient = accountsArray[recipientIdx];

  // check if enough balance
  if (sender.balance < +tx.amount) return false;

  //update sender & recipient data
  sender.balance -= +tx.amount;
  recipient.balance += +tx.amount;

  return true;
}

function validateTxValues(tx: any): Tx | 0 {
  if (!tx) return 0;
  if (isNaN(+tx.amount)) return 0;
  const { sender, amount, recipient } = tx;
  if (sender && amount && recipient) return tx;
  return 0;
}

// * vals
function getUpdatedValues(tx: Tx) {
  const sender = accountsArray.find((acc) => acc.name === tx.sender);
  const recipient = accountsArray.find((acc) => acc.name === tx.recipient);

  return {
    sender: {
      name: sender?.name || "no-name",
      balance: sender?.balance || "no-balance",
    },
    recipient: {
      name: recipient?.name || "no-name",
      balance: recipient?.balance || "no-balance",
    },
  };
}
