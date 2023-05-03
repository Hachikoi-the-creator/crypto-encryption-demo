import { bytesToHex } from "@noble/curves/abstract/utils";
import axios from "axios";
import { randomBytes } from "crypto";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { useRef } from "react";

type Props = {
  userKeys: { privateKey: string; publicKey: string };
};

function TxForm({ userKeys }: Props) {
  const { privateKey, publicKey } = userKeys;
  const senderRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const recipiendRef = useRef<HTMLInputElement>(null);

  const sendTx = async () => {
    const amount = amountRef.current?.value;

    const tx = {
      sender: senderRef.current?.value || "no-sender",
      amount: amount ? +amount : 0,
      recipient: recipiendRef.current?.value || "no-recipient",
      randomNum: bytesToHex(randomBytes(21)), // + security
    };

    const txHash = utf8ToBytes(JSON.stringify(tx));
    const signedTxHash = secp256k1.sign(txHash, privateKey);

    const validateTnxData = {
      signedHashHex: signedTxHash.toCompactHex(),
      txHash: bytesToHex(txHash),
      publicKey,
    };

    // validate tx in the server, will also have a txDone value whit tx info
    const { data } = await axios.post("api/validateTx", validateTnxData);
    if (data.validTx) console.log("Poggers :D");
    else console.log("bu bu desu wa!");
  };

  return (
    <form onSubmit={sendTx}>
      <label>
        <input type="text" />
      </label>

      <label>
        <input type="number" />
      </label>

      <label>
        <input type="text" />
      </label>

      <button>Send TX</button>
    </form>
  );
}

export default TxForm;
