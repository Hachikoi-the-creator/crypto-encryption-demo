export type Account = {
  name: string; // Username if want to limit this, which showed to be annoying af
  publicKey: string;
  privateKey: string;
  balance: number;
};

export const accountsArray: Account[] = [
  {
    name: "alice",
    publicKey:
      "030dd4bdeb9e7e6f4e62678ec9c57db844df872db1581f9e739fc01f8b105b15e5",
    privateKey:
      "64c15bd6c37f43ce818aced3c76699405047631e55ddae3eea5afa490872b7bc",
    balance: 777,
  },
  {
    name: "jhon",
    publicKey:
      "020f30cf0c0d624ce8c07cbac2e651adf23145ac1d959ef6192cb26b9516c6fe19",
    privateKey:
      "51450f3f620fdfc0ac6d000130ca8fd23563626f7f3c747ab76519c3f019addb",
    balance: 101,
  },
  {
    name: "eve",
    publicKey:
      "02d9e90735ebb069e7da9ee4d9abf2e98b239ce3ea1fc6bd031a0c27b5a92fb01a",
    privateKey:
      "0a4f1687d420a942f42ab9a7230bf6ff63ba2e45bd0b666f7b62d386524affc1",
    balance: 107,
  },
  {
    name: "chris",
    publicKey:
      "03ac782f126633ccb25cb3d2e864949cbbad76c7ef7529e4523befb9ce6be7390d",
    privateKey:
      "78e8f83ff2f082c76f7d64389e61bd1e0751a454d6930d6835c3d465123d9099",
    balance: 190,
  },
  {
    name: "anabelle",
    publicKey:
      "0309a29ef7ef4f62433197863ff1dc3b4ff0956d7cf6b611e402a0dc214f788d25",
    privateKey:
      "ea52c0ff3f428fcb02f0c2a16ecbce78fc91ca26da57e96f3682ca85cab5bcea",
    balance: 200,
  },
];

// export type NameIndexed = {
//   [key in string]: {
//     publicKey: string;
//     privateKey: string;
//     balance: number;
//   };
// };

// export type PublicKeyIndexed = {
//   [key in string]: {
//     name: string;
//     privateKey: string;
//     balance: number;
//   };
// };

// export const nameIndexedAccounts: NameIndexed = Object.fromEntries(
//   accountsArray.map((obj) => [
//     obj.name,
//     {
//       publicKey: obj.publicKey,
//       privateKey: obj.privateKey,
//       balance: obj.balance,
//     },
//   ])
// );

// export const publicKeyIndexedAccounts: PublicKeyIndexed = Object.fromEntries(
//   accountsArray.map((obj) => [
//     obj.publicKey,
//     {
//       name: obj.name,
//       privateKey: obj.privateKey,
//       balance: obj.balance,
//     },
//   ])
// );
