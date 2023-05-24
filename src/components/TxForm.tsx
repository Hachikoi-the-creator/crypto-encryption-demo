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

type UpdatedVals = { name: string; balance: string };

type ApiRes = {
  status: "success" | "error";
  updatedData: { recipient: UpdatedVals; sender: UpdatedVals };
};

export default function TxForm() {
  const { sender, recipient, setRecipient, setSender } =
    useContext(AccountContext);
  const amountRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // * helper to manage the UI change (balances)
  const updateAppState = (updatedVals: ApiRes["updatedData"]) => {
    // update app balances
    const updatedRecipient: Account = {
      ...recipient,
      balance: +updatedVals.recipient.balance,
      name: updatedVals.recipient.name,
    };

    const updatedSender: Account = {
      ...sender,
      balance: +updatedVals.sender.balance,
      name: updatedVals.sender.name,
    };

    setSender(updatedSender);
    setRecipient(updatedRecipient);
  };

  // * helper to make sendTx more readable
  const getDataToSend = () => {
    if (!amountRef.current?.value)
      return console.error("please send an amount");

    const amount = amountRef.current?.value;
    const randomHex = bytesToHex(randomBytes(21)); // + security
    const tx = { sender, amount, recipient, randomHex };

    const txHash = utf8ToBytes(JSON.stringify(tx));
    const signedTxHash = secp256k1.sign(txHash, sender.privateKey);

    return {
      signedHashHex: signedTxHash.toCompactHex(),
      txHash: bytesToHex(txHash),
      publicKey: sender.publicKey,
      tx: { sender: sender.name, amount, recipient: recipient.name },
    };
  };

  // * ---- tx sender ----
  const sendTx = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toVerifyData = getDataToSend();

    try {
      setLoading(true);
      const { data }: { data: ApiRes } = await axiosBase.post(
        "/executeTx",
        toVerifyData
      );
      updateAppState(data.updatedData);
      console.log(data);
    } catch (error) {
      console.error("failed doing tx", (error as Error).message);
    } finally {
      setLoading(false);
    }
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
