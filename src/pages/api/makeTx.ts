import { accountsArray } from "@/data/accounts";
import type { NextApiRequest, NextApiResponse } from "next";

type Tx = {
  sender: string;
  amount: string;
  recipient: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const tx = req.body;

    const validTtx = validateTxValues(tx);
    if (!validTtx)
      return res.send({ error: "TX has invalid format or missing values" });

    const successfulTx = executeTx(tx);
    if (!successfulTx) return res.status(400).send("cannot execute tx");
    const updatedValues = getUpdatedValues(tx);

    res.send({ status: "success", updatedValues });
  }
}

// * aaaaaaaaaaaaaaaaa
function validateTxValues(tx: any) {
  if (!tx) return false;
  const { sender, amount, recipient } = tx;
  if (sender && amount && recipient) return true;
  return false;
}

// * tx
function executeTx(tx: Tx) {
  if (isNaN(+tx.amount)) return false;

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
  // accountsArray.splice();
  // accountsArray.splice();
  return true;
}

// * vals
function getUpdatedValues(tx: Tx) {
  const sender = accountsArray.find((acc) => acc.name === tx.sender);
  const recipient = accountsArray.find((acc) => acc.name === tx.recipient);

  return {
    sender: { name: sender?.name, balance: sender?.balance },
    recipient: { name: recipient?.name, balance: recipient?.balance },
  };
}

// // * dunno how to mak it work again, sadge
// // Basic validation of hashes, by lenght and string type, as well as tx verification
// type Tx = {
//   sender: string;
//   amount: string;
//   recipient: string;
// };

// function validateTxHash(
//   signedHashHex: any,
//   txHash: any,
//   publicKey: any
// ): boolean {
//   const validSignedHash =
//     signedHashHex.length > 95 &&
//     signedHashHex.length < 120 &&
//     typeof signedHashHex === "string";
//   const validTxHash =
//     txHash.length > 98 &&
//     txHash.length < 120 &&
//     typeof signedHashHex === "string";
//   const validPublicKey =
//     publicKey.length > 65 &&
//     publicKey.length < 75 &&
//     typeof signedHashHex === "string";

//   if (!(validPublicKey || validTxHash || validSignedHash)) return false;

//   const isValid = secp256k1.verify(signedHashHex, txHash, publicKey);

//   return isValid;
// }

// // Check if the given publick key matches the sender account name
// function verifyTransaction(publicKey: any, tx: undefined | Tx): boolean {
//   if (!(publicKey || tx)) return false;
//   const relatedAcc = accountsArray.find((acc) => acc.publicKey === publicKey);
//   const senderIsOwner = relatedAcc?.name === tx?.sender;

//   return senderIsOwner;
// }

// // once everyting has been confirmed make the TX, but first check if sender has enough money & if recipient exist
// function executeTx(tx: Tx): boolean {
//   const invalidAmount = isNaN(+tx.amount);
//   const enoughSenderMoney = balances[tx.sender] >= +tx.amount;
//   if (invalidAmount || !enoughSenderMoney) return false; //NaN or not enough balance

//   const senderAcc = accountsArray.find((acc) => acc.name === tx.sender);
//   if (!senderAcc) return false; // non existent sender

//   const recipientAcc = accountsArray.find((acc) => acc.name === tx.recipient);
//   if (!recipientAcc) return false; // non existent recipient

//   balances[senderAcc.name] -= +tx.amount;
//   balances[recipientAcc.name] += +tx.amount;
//   return true;
// }
