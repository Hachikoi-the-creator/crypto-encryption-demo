import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { bytesToHex } from "ethereum-cryptography/utils";

export const generateKeyPairs = () => {
  const privateKey = bytesToHex(secp256k1.utils.randomPrivateKey());
  const publicKey = bytesToHex(secp256k1.getPublicKey(privateKey));
  return { privateKey, publicKey };
};

const mapping = Array(5)
  .fill(0)
  .map((e) => {
    const privateKey = bytesToHex(secp256k1.utils.randomPrivateKey());
    const publicKey = bytesToHex(secp256k1.getPublicKey(privateKey));
    return { dickson: { publicKey, privateKey } };
  });
