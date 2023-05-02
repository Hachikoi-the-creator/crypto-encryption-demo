import { keccak256 } from "ethereum-cryptography/keccak";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { bytesToHex, toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { FormEvent, useRef } from "react";

type Props = {
  keys: {
    private: string;
    public: string;
  };
};

export default function SendTx({ keys }: Props) {
  const senderRef = useRef<HTMLInputElement>(null);
  const recipiendRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  /**
   * 1. everyting to bytes,
   * 2. then sign it with the pk
   * 3. send the signed tx & data signed
   * 4. later find a way to not need the pk in the server
   */
  const postData = async () => {
    const sendData = {
      signature: "",
      msgHash: "",
      publicKey: keys.public,
    };
    const approvedTx = {
      sender: "",
      recipient: "",
      amount: 1,
    };
    approvedTx.sender = senderRef.current?.value || "0x100";
    approvedTx.recipient = recipiendRef.current?.value || "0x101";
    const possibleAmount = amountRef.current?.value;
    approvedTx.amount = !!possibleAmount ? +possibleAmount : 2;

    // send data info to string => bytes => hash => hex
    const tnxBytes = keccak256(utf8ToBytes(approvedTx.toString()));
    sendData.msgHash = bytesToHex(tnxBytes);
    const fucing_fuck = secp256k1.sign(
      tnxBytes,
      toHex(utf8ToBytes(keys.private))
    );
    console.log(fucing_fuck);

    // sendData.signature = secp256k1.sign(tnxBytes,keys.private)
    const signedMsg = 1;

    // const { data } = await axios.post("/api/data", approvedTx);
    // console.log(data);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postData();
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" name="sender" ref={senderRef} />
      <input type="text" name="recipient" ref={recipiendRef} />
      <input type="number" name="amount" ref={amountRef} />
      <button>Send tx</button>
    </form>
  );
}
