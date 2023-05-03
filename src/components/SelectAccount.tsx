import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { bytesToHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { ChangeEvent } from "react";

type KeyPairs = { public: string; private: string };

type Props = {
  updateKeys: (updatedKeys: KeyPairs) => void;
  currPrivate: string;
};

const PRIVATE_KEYS = [
  "089eadc5aaa8a3e309b6cf07c871478af3a1969a27c01c81ec04758635c497c5",
  "b9ef2bdf070740f4bc331692b7e0689b3e4e0e678ae3c174f7a18850b8a21590",
  "f93b5cae32779e53286b625c3f364a499f93a4f3b15a315634b83d7ed2485960",
  "29959c8e7483383454f713ad4e19c46a4627b58b0b5d7d8b628f4643a1963dd9",
];

const PUBLIC_KEYS = [
  bytesToHex(secp256k1.getPublicKey(PRIVATE_KEYS[0])),
  bytesToHex(secp256k1.getPublicKey(PRIVATE_KEYS[1])),
  bytesToHex(secp256k1.getPublicKey(PRIVATE_KEYS[2])),
  bytesToHex(secp256k1.getPublicKey(PRIVATE_KEYS[3])),
];

export default function SelectAccount(props: Props) {
  const { updateKeys, currPrivate } = props;
  console.log(PRIVATE_KEYS[0], PUBLIC_KEYS[0]);

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = +e.target.value || 0;
    const updatedPairs: KeyPairs = {
      public: PRIVATE_KEYS[index],
      private: PUBLIC_KEYS[index],
    };
    updateKeys(updatedPairs);
  };

  return (
    <div>
      <label htmlFor="account">Select account</label>
      <select name="account" id="account" onChange={selectHandler}>
        {PRIVATE_KEYS.map((e, i) => (
          <option value={i} key={e}>
            Account {i + 1}
          </option>
        ))}
      </select>
      <p>
        0x
        {`${currPrivate.slice(0, 5)} ... ${currPrivate.slice(
          currPrivate.length - 7
        )}`}
      </p>
    </div>
  );
}
