import type { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const { sender, recipient, amount } = req.body;

    case "GET":
      const { adx } = req.query;

    default:
  }
}

export default handler;
