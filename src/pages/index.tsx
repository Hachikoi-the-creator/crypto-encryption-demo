import Head from "next/head";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { bytesToHex as toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import SelectKeys from "@/components/SelectKeys";

export type KeyPairs = { private: string; public: string };

const inter = Inter({ subsets: ["latin"] });
const DEFAULT_PRIVATE_KEY =
  "089eadc5aaa8a3e309b6cf07c871478af3a1969a27c01c81ec04758635c497c5";

export default function Home() {
  const senderRef = useRef<HTMLInputElement>(null);
  const recipiendRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const [keys, setKeys] = useState({
    private: DEFAULT_PRIVATE_KEY,
    public: toHex(secp256k1.getPublicKey(DEFAULT_PRIVATE_KEY)),
  });

  const getData = async (accNum: number) => {
    const { data } = await axios(`/api/data?adx=0x${accNum}`);
    console.log(data);
  };

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
    sendData.msgHash = toHex(tnxBytes);
    const fucing_fuck = secp256k1.sign(tnxBytes, keys.private);
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

  const logPK = () => {
    const res = Array(6).fill(1).map((_) =>
      toHex(secp256k1.utils.randomPrivateKey())
    );
    const pkBits1 = secp256k1.utils.randomPrivateKey();
    const publicBits = secp256k1.getPublicKey(pkBits1);
    console.log(toHex(publicBits));

    console.log(res);
  };

  const showStuff = () => {
    console.log(keys);
  };

  const updateKeys = (updatedVal: KeyPairs) => {
    setKeys(updatedVal);
  };

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Hewo there</h1>
        <form onSubmit={submitHandler}>
          <input type="text" name="sender" ref={senderRef} />
          <input type="text" name="recipient" ref={recipiendRef} />
          <input type="number" name="amount" ref={amountRef} />
          <button>Send tx</button>
        </form>
        <button onClick={() => getData(7)}>Get acc 7</button>
        <button onClick={() => getData(1)}>Get acc 1</button>
        <button onClick={postData}>Post</button>
        <button onClick={showStuff}>Show stuff</button>
        <SelectKeys
          {...{ updateKeys }}
          currPrivate={keys.private}
        />
      </main>
    </>
  );
}
