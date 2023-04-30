// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string
// }
// res: NextApiResponse<Data>
//
const balances: { [key: string]: number } = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      const { sender, recipient, amount } = req.body;
      const success = handlePost(sender, recipient, amount);
      const dataToSend = success
        ? {
          sender: balances[sender as string],
          recipient: balances[recipient as string],
        }
        : { err: "sender has not enough money or missing data" };
      return res.send(dataToSend);

    case "GET":
      const { adx } = req.query;
      if (!balances[adx as string]) balances[adx as string] = 1;
      const accMoney = balances[adx as string];
      return res.send({ adx: accMoney });
    default:
  }
}

// -/+ amount from both acccounts & makes sure the sender has enough founds & hanlde the case where recipient doesn't yet exist
function handlePost(sender: any, recipient: any, amount: any): boolean {
  // any is missing
  if (!sender || !recipient || !amount) return false;
  // amount is not a number
  if (isNaN(+amount)) return false;
  // sender doesn't yet exist
  if (isNaN(+balances[sender])) return false;
  // sender has not enough money
  if (balances[sender] < +amount) return false;

  balances[sender] -= amount;
  // if acc already exist + money, else new initialize with money
  if (balances[recipient]) balances[recipient] += +amount;
  else balances[recipient] = +amount;
  return true;
}
