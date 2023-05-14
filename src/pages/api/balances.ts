import { Account, accountsArray } from "@/data/accounts";
import { generateKeyPairs } from "@/utils/generateKeys";
import type { NextApiRequest, NextApiResponse } from "next";

// * localhost:3000/api/balances?name=alice
function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.send({ error: "unavaialble method" });

  const name = req.query.name;
  if (typeof name !== "string") {
    console.log("mising name or weird format, sending the first acc");
    return res.send({
      name: accountsArray[0].name,
      balance: accountsArray[0].balance,
    });
  }

  const foundUser =
    accountsArray.find((acc) => acc.name === name.toLowerCase()) ||
    generateNewAccount(name);
  res.send(foundUser);
}

export default handler;

function generateNewAccount(name: string): Account {
  const { privateKey, publicKey } = generateKeyPairs();
  return { name, privateKey, publicKey, balance: 0 };
}
