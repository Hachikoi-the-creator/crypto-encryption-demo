import type { NextApiRequest, NextApiResponse } from "next";

const balances: { [key: string]: number } = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const { signedHashHex, txHash, publicKey } = req.body;
      const success = handlePost(signedHashHex, txHash, publicKey);

      if (success)
        return res.send({
          a: "ass",
          // sender: balances[sender as string],
          // recipient: balances[recipient as string],
        });

      return res.send({ err: "sender has not enough money or missing data" });

    case "GET":
      const { adx } = req.query;
      if (!balances[adx as string]) balances[adx as string] = 1;
      const accMoney = balances[adx as string];
      return res.send({ adx: accMoney });
    default:
  }
}

// -/+ amount from both acccounts & makes sure the sender has enough founds & hanlde the case where recipient doesn't yet exist
function handlePost(signedHashHex: any, txHash: any, publicKey: any): boolean {
  console.log(signedHashHex, txHash, publicKey);
  const validData = [signedHashHex, txHash, publicKey].every(
    (e) => e.length > 13
  );

  // // any is missing
  // if (!sender || !recipient || !amount) return false;
  // // amount is not a number
  // if (isNaN(+amount)) return false;
  // // sender doesn't yet exist
  // if (isNaN(+balances[sender])) return false;
  // // sender has not enough money
  // if (balances[sender] < +amount) return false;

  // balances[sender] -= amount;
  // // if acc already exist + money, else new initialize with money
  // if (balances[recipient]) balances[recipient] += +amount;
  // else balances[recipient] = +amount;
  return validData;
}
