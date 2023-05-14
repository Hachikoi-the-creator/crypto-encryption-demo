import axios from "axios";
import { FormEvent, useContext, useRef } from "react";
import { bytesToHex } from "@noble/curves/abstract/utils";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { randomBytes } from "crypto";
import { AccountContext } from "@/pages";
import SelectRecipient from "./SelectRecipient";
import SelectAccount from "./SelectSender";

export default function TxForm() {
  const { sender, recipient } = useContext(AccountContext);
  const amountRef = useRef<HTMLInputElement>(null);

  // * ---- tx sender ----
  const sendTx = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = amountRef.current?.value || 0;
    const randomHex = bytesToHex(randomBytes(21)); // + security

    const tx = { sender, amount, recipient, randomHex };

    const txHash = utf8ToBytes(JSON.stringify(tx));
    const signedTxHash = secp256k1.sign(txHash, sender.privateKey);
    const ver = secp256k1.verify(signedTxHash, txHash, sender.publicKey);
    console.log("ver", ver);

    const validateTnxData = {
      signedHashHex: signedTxHash.toCompactHex(),
      txHash: bytesToHex(txHash),
      publicKey: sender.publicKey,
      sender: tx.sender,
      amount: tx.amount,
      recipient: tx.recipient,
    };
    console.log(validateTnxData);

    // validate tx in the server, will also have a txDone value whit tx info
    const { data } = await axios.post("api/validateTx", validateTnxData);
    console.log("owo", data);
  };

  return (
    <main className="main">
      <form onSubmit={sendTx} className="tx-form">
        <SelectAccount />

        <label>
          Amount
          <input type="number" ref={amountRef} />
        </label>

        <SelectRecipient />
        <button>Send TX</button>
      </form>
    </main>
  );
}
