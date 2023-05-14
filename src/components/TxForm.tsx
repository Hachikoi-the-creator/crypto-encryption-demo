import { ChangeEvent, FormEvent, useContext, useRef, useState } from "react";
import axios from "axios";
import { bytesToHex } from "@noble/curves/abstract/utils";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { randomBytes } from "crypto";
import { AccountContext } from "@/pages";
import { Username, accountsArray } from "@/utils/accounts";
import SelectRecipient from "./SelectRecipient";
import SelectAccount from "./SelectSender";

export default function TxForm() {
  const { account } = useContext(AccountContext);
  const [recipient, setRecipient] = useState<Username>("eve");
  const amountRef = useRef<HTMLInputElement>(null);
  // arr of names without the one that's the current sender
  const accNames = accountsArray
    .map((e) => e.name)
    .filter((e) => e !== account.name);

  // * ---- tx sender ----
  const sendTx = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = amountRef.current?.value || 0;
    const sender = account.name;
    const randomHex = bytesToHex(randomBytes(21)); // + security

    const tx = { sender, amount, recipient, randomHex };

    const txHash = utf8ToBytes(JSON.stringify(tx));
    const signedTxHash = secp256k1.sign(txHash, account.privateKey);

    const validateTnxData = {
      signedHashHex: signedTxHash.toCompactHex(),
      txHash: bytesToHex(txHash),
      publicKey: account.publicKey,
      sender: tx.sender,
      amount: tx.amount,
      recipient: tx.recipient,
    };
    console.log(validateTnxData);

    // validate tx in the server, will also have a txDone value whit tx info
    const { data } = await axios.post("api/validateTx", validateTnxData);
    if (data.validTx) console.log("Poggers :D", data);
    else console.log("bu bu desu wa!", data);
  };

  const updateRecipient = (e: ChangeEvent<HTMLSelectElement>) => {
    // since the select only has valid options I can rest assure this wont fail
    setRecipient(e.target.value as Username);
  };

  return (
    <main className="main">
      <form onSubmit={sendTx} className="tx-form">
        <SelectAccount />

        <label>
          Amount
          <input type="number" ref={amountRef} />
        </label>

        <SelectRecipient {...{ updateRecipient, accNames }} />

        <button>Send TX</button>
      </form>
    </main>
  );
}
