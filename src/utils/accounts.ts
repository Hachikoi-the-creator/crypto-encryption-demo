import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { bytesToHex } from "ethereum-cryptography/utils";

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

// export const mapping = Array(5)
//   .fill(0)
//   .map((e) => {
//     const privateKey = secp256k1.utils.randomPrivateKey();
//     const publicKey = secp256k1.getPublicKey(privateKey);
//     return { dickson: { publicKey, privateKey } };
//   });

export default {
  alice: {
    public: PUBLIC_KEYS[0],
    private: PRIVATE_KEYS[0],
  },
  jhon: {
    public: PUBLIC_KEYS[1],
    private: PRIVATE_KEYS[1],
  },
  eve: {
    public: PUBLIC_KEYS[2],
    private: PRIVATE_KEYS[2],
  },
  chris: {
    public: PUBLIC_KEYS[3],
    private: PRIVATE_KEYS[3],
  },
};
