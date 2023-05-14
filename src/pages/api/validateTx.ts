import { Username, accountsArray } from "@/utils/accounts";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import type { NextApiRequest, NextApiResponse } from "next";

type Balance = { [key in Username]: number };

const balances: Balance = {
  alice: 100,
  anabelle: 50,
  chris: 70,
  eve: 77,
  jhon: 90,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const { signedHashHex, txHash, publicKey, sender, amount, recipient } =
        req.body;
      const tx = { sender, amount, recipient };

      const validSignature = validateTxHash(signedHashHex, txHash, publicKey);
      if (!validSignature)
        return res.send({ error: "Tx signed with a wrong private key!" });

      const validtx = verifyTransaction(publicKey, tx);
      if (!validtx)
        return res.send({
          error: "You don't have rights to send money from that account!",
        });

      const txWasSuccesfull = executeTx(tx);
      if (!txWasSuccesfull)
        return res.send({
          error: "You may not have enough money to send this TX ~",
        });

      // all OK!
      return res.send({
        msg: `${tx.sender} has sent ${tx.amount} to ${tx.recipient} !`,
      });

    // case "GET":
    //   const { adx } = req.query;
    //   if (!balances[adx as string]) balances[adx as string] = 1;
    //   const accMoney = balances[adx as string];
    //   return res.send({ adx: accMoney });
    default:
  }
}

// Basic validation of hashes, by lenght and string type, as well as tx verification
function validateTxHash(
  signedHashHex: any,
  txHash: any,
  publicKey: any
): boolean {
  const validSignedHash =
    signedHashHex.length > 95 &&
    signedHashHex.length < 120 &&
    typeof signedHashHex === "string";
  const validTxHash =
    txHash.length > 98 &&
    txHash.length < 120 &&
    typeof signedHashHex === "string";
  const validPublicKey =
    publicKey.length > 65 &&
    publicKey.length < 75 &&
    typeof signedHashHex === "string";

  if (!(validPublicKey || validTxHash || validSignedHash)) return false;

  const isValid = secp256k1.verify(signedHashHex, txHash, publicKey);

  return isValid;
}

type Tx = {
  sender: string;
  amount: string;
  recipient: string;
};
// Check if the given publick key matches the sender account name
function verifyTransaction(publicKey: any, tx: undefined | Tx): boolean {
  if (!(publicKey || tx)) return false;
  const relatedAcc = accountsArray.find((acc) => acc.publicKey === publicKey);
  const senderIsOwner = relatedAcc?.name === tx?.sender;

  return senderIsOwner;
}

// once everyting has been confirmed make the TX, but first check if sender has enough money & if recipient exist
function executeTx(tx: Tx): boolean {
  const senderAcc = accountsArray.find((acc) => acc.name === tx.sender);
  const recipientAcc = accountsArray.find((acc) => acc.name === tx.recipient);
  // check if it has enough balance
  // if (senderAcc?.name)
}
// -/+ amount from both acccounts & makes sure the sender has enough founds & hanlde the case where recipient doesn't yet exist
function handlePost(signedHashHex: any, txHash: any, publicKey: any) {
  console.log(signedHashHex, txHash, publicKey);
  const validData = [signedHashHex, txHash, publicKey].every(
    (e) => e.length > 13
  );
}
