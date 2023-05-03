import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { bytesToHex, utf8ToBytes } from "ethereum-cryptography/utils";

export type Accounts = {
  [key in Username]: {
    private: string;
    public: string;
  };
};

export type Username = "bob" | "alice" | "charlie";

// List of account keys in hexa format without the '0x'
const ACCOUNTS: Accounts = {
  bob: {
    private: "93207b2b99dbba29a29ec028caa5855bca8ecdd8862cd1898baf005a5a15dfbb",
    public:
      "02637b8b565d1596c1a2f0b0f3952a57b291adf62c5a3ac5bb6d230bd28ef16fc5",
  },
  alice: {
    private: "0a2ea55a286fa00def644c25eb3c39fef6d0c21d9b991e3edc6197b3fd6007ec",
    public:
      "024f675af265618e06aaa8be66b1e6fee74f56722f6cb9613718a927c24f89cd53",
  },
  charlie: {
    private: "d97772600759e79bd7deba81ce246336bd81f7fcbf759034f865e6c361ca8fcf",
    public:
      "03c1ed4ae4d9c02c459b5cdbdaa406e18b4d8111807e858b1e856415255221afa4",
  },
};

// * hash Msg
export const hashMsg = (message: string): Uint8Array =>
  keccak256(utf8ToBytes(message));

// * access public Key in a more type safe way
export const getPublicKey = (username: Username): string =>
  ACCOUNTS[username].public;

// * access private Key in a more type safe way
export const getPrivateKey = (username: Username): string =>
  ACCOUNTS[username].private;

// * trick to check if the one who siged is the same as the sender
export const findUserWhoSigned = (
  msgHash: Uint8Array,
  username: Username
): Username | null => {
  // sign message again, since cannot move around that weird type
  const privateKey = getPrivateKey(username);
  const signed = secp256k1.sign(msgHash, privateKey);
  const publicKeyElipticCoords = signed.recoverPublicKey(msgHash);

  const publicKey = publicKeyElipticCoords.toHex();
  // ---- find the user whos public key was derived from the signed tx
  // Need to map the keys so ts knows keys:Username[] - keyof gives an union type
  const keys = Object.keys(ACCOUNTS) as (keyof Accounts)[];

  for (let i = 0; i < keys.length; i++) {
    if (ACCOUNTS[keys[i]].public === publicKey) return keys[i];
  }
  return null;
};

/**
 * 1. object with the tnx, keccac hashed version of it & signed version of that hash
 * 2. backend: derive the public key &  verify signature
 * 3. if the signature is valid get a hold of the object that was sent along & check if sender === public key owner
 */

export type Tx = { sender: Username; recipient: string; amount: number };

export const runCompleteExample = (sender: Username = "alice") => {
  const dataToSend = {
    tx: { sender: "", amount: 0, recipient: "" },
    signedHashHex: "",
    txHash: "",
    publickKey: "",
  };

  const tx = { sender, amount: 7, recipient: "bob" };
  // dataToSend.tx = tx;
  const txHash = keccak256(utf8ToBytes(JSON.stringify(tx)));
  // dataToSend.txHash = bytesToHex(txHash);
  const signedTxHash = secp256k1.sign(txHash, "ACCOUNTS[sender].private");
  // dataToSend.signedHashHex = signedTxHash.toCompactHex()

  const publicKey = signedTxHash.recoverPublicKey(txHash).toHex(); // derived public key from tx & signed tx

  dataToSend.signedHashHex = signedTxHash.toCompactHex();
  dataToSend.txHash = bytesToHex(txHash);
  dataToSend.publickKey = ACCOUNTS[sender].public;

  // backend sending publicKey of validated tx alongside the tx itself
  const isValid = secp256k1.verify(
    dataToSend.signedHashHex,
    dataToSend.txHash,
    dataToSend.publickKey
  ); // verify tx is valid

  // NEED: publicKey derived from signedTx - senderPublicKey
  // todo: find a way to recover the tx from the hashedTx
  // trick to find the user since cannot recover the hashed tx as of now
  const samePublicKey = publicKey === ACCOUNTS[sender].public;

  console.log("isValidSignature & Tx", isValid, samePublicKey);
};
