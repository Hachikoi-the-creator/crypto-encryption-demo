import { axiosBase } from "@/utils/axiosBase";
import { FormEvent, useContext, useRef } from "react";
import { bytesToHex } from "@noble/curves/abstract/utils";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { randomBytes } from "crypto";
import Image from "next/image";

import { AccountContext } from "@/pages";
import SelectRecipient from "./SelectRecipient";
import SelectAccount from "./SelectSender";
import sendArrow from "@/assets/arrow.png";
import { Account } from "@/data/accounts";

export default function TxForm() {
  const { sender, recipient, setRecipient, setSender } =
    useContext(AccountContext);
  const amountRef = useRef<HTMLInputElement>(null);

  // * ---- tx sender ----
  const sendTx = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = amountRef.current?.value || 0;
    const randomHex = bytesToHex(randomBytes(21)); // + security

    const tx = { sender, amount, recipient, randomHex };

    const txHash = utf8ToBytes(JSON.stringify(tx));
    const signedTxHash = secp256k1.sign(txHash, sender.privateKey);
    const isVerified = secp256k1.verify(signedTxHash, txHash, sender.publicKey);
    console.log("isVerified", isVerified, tx);
    if (!isVerified) return console.error("unable to validate TX");

    // validate tx in the server, will also have a txDone value whit tx info
    const { data } = await axiosBase.post("/makeTx", {
      sender: sender.name,
      amount,
      recipient: recipient.name,
    });

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
  };

  return (
    <main className="main">
      <form onSubmit={sendTx} className="form">
        <div className="form-container">
          <SelectAccount {...{ amountRef }} />
          <Image
            src={sendArrow}
            width={100}
            height={100}
            alt="send money arrow"
          />
          <SelectRecipient />
        </div>
        <button className="send-btn button">Send TX</button>
      </form>
    </main>
  );
}
