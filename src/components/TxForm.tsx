import { axiosBase } from "@/utils/axiosBase";
import { FormEvent, useContext, useRef, useState } from "react";
import { bytesToHex } from "@noble/curves/abstract/utils";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { randomBytes } from "crypto";
import Image from "next/image";

import { AccountContext } from "@/pages";
import SelectRecipient from "./SelectRecipient";
import SelectAccount from "./SelectSender";
import sendArrow from "@/assets/arrow.png";
import loadingGif from "@/assets/loading.gif";
import { Account } from "@/data/accounts";

export default function TxForm() {
  const { sender, recipient, setRecipient, setSender } =
    useContext(AccountContext);
  const amountRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const attemptTx = async (tx: {
    sender: string;
    amount: string;
    recipient: string;
  }) => {
    setLoading(true);
    try {
      const { data } = await axiosBase.post("/makeTx", tx);

      // update app balances
      const updatedRecipient: Account = {
        ...recipient,
        balance: data.updatedValues.recipient.balance,
        name: data.updatedValues.recipient.name,
      };
      const updatedSender: Account = {
        ...sender,
        balance: data.updatedValues.sender.balance,
        name: data.updatedValues.sender.name,
      };

      setSender(updatedSender);
      setRecipient(updatedRecipient);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // * ---- tx sender ----
  const sendTx = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amountRef.current?.value)
      return console.error("please send an amount");

    const amount = amountRef.current?.value;
    const randomHex = bytesToHex(randomBytes(21)); // + security
    const tx = { sender, amount, recipient, randomHex };

    const txHash = utf8ToBytes(JSON.stringify(tx));
    const signedTxHash = secp256k1.sign(txHash, sender.privateKey);
    const isVerified = secp256k1.verify(signedTxHash, txHash, sender.publicKey);
    if (!isVerified) return console.error("unable to validate TX");

    // execute TX

    attemptTx({
      sender: sender.name,
      amount,
      recipient: recipient.name,
    });
  };

  return (
    <main className="main">
      <form onSubmit={sendTx} className="form">
        <div className="form-container">
          <SelectAccount {...{ amountRef }} />
          <Image
            src={loading ? loadingGif : sendArrow}
            width={100}
            height={100}
            alt="send money arrow"
            className="img"
          />
          <SelectRecipient />
        </div>
        <button disabled={loading} className="send-btn button">
          Send TX
        </button>
      </form>
    </main>
  );
}
