import { FormEvent, useContext, useRef } from "react";
import axios from "axios";
import { bytesToHex } from "@noble/curves/abstract/utils";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { randomBytes } from "crypto";
import { AccountContext } from "@/pages";
import { accountsArray } from "@/utils/accounts";
import SelectRecipient from "./SelectRecipient";
import SelectAccount from "./SelectAccount";

export default function TxForm() {
  const { account } = useContext(AccountContext);
  const amountRef = useRef<HTMLInputElement>(null);
  const recipientRef = useRef<HTMLSelectElement>(null);
  // arr of names without the one that's the current sender
  const accNames = accountsArray
    .map((e) => e.name)
    .filter((e) => e !== account.name);

  const sendTx = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = amountRef.current?.value || 0;
    const sender = account.name;
    const recipient = recipientRef.current?.value || "no-recipient";
    const randomHex = bytesToHex(randomBytes(21)); // + security

    const tx = { sender, amount, recipient, randomHex };

    const txHash = utf8ToBytes(JSON.stringify(tx));
    const signedTxHash = secp256k1.sign(txHash, account.privateKey);

    const validateTnxData = {
      signedHashHex: signedTxHash.toCompactHex(),
      txHash: bytesToHex(txHash),
      publicKey: account.publicKey,
    };
    console.log(validateTnxData, tx);

    // validate tx in the server, will also have a txDone value whit tx info
    // const { data } = await axios.post("api/validateTx", validateTnxData);
    // if (data.validTx) console.log("Poggers :D");
    // else console.log("bu bu desu wa!");
  };

  return (
    <form onSubmit={sendTx}>
      <h1>
        sending {amountRef.current?.value || 0} from {account.name} to
        {recipientRef.current?.value || "nobody"}
      </h1>
      <SelectAccount />

      <label>
        Amount
        <input type="number" />
      </label>

      <SelectRecipient {...{ recipientRef, accNames }} />

      <button>Send TX</button>
    </form>
  );
}
