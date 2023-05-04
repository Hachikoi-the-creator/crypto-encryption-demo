// ? chat gipiti did this transormation so no trust it too much
export type Username = "jhon" | "alice" | "eve" | "chris" | "anabelle";

export type Account = {
  name: Username;
  publicKey: string;
  privateKey: string;
};

export const accountsArray: Account[] = [
  {
    name: "alice",
    publicKey:
      "030dd4bdeb9e7e6f4e62678ec9c57db844df872db1581f9e739fc01f8b105b15e5",
    privateKey:
      "64c15bd6c37f43ce818aced3c76699405047631e55ddae3eea5afa490872b7bc",
  },
  {
    name: "jhon",
    publicKey:
      "020f30cf0c0d624ce8c07cbac2e651adf23145ac1d959ef6192cb26b9516c6fe19",
    privateKey:
      "51450f3f620fdfc0ac6d000130ca8fd23563626f7f3c747ab76519c3f019addb",
  },
  {
    name: "eve",
    publicKey:
      "02d9e90735ebb069e7da9ee4d9abf2e98b239ce3ea1fc6bd031a0c27b5a92fb01a",
    privateKey:
      "0a4f1687d420a942f42ab9a7230bf6ff63ba2e45bd0b666f7b62d386524affc1",
  },
  {
    name: "chris",
    publicKey:
      "03ac782f126633ccb25cb3d2e864949cbbad76c7ef7529e4523befb9ce6be7390d",
    privateKey:
      "78e8f83ff2f082c76f7d64389e61bd1e0751a454d6930d6835c3d465123d9099",
  },
  {
    name: "anabelle",
    publicKey:
      "0309a29ef7ef4f62433197863ff1dc3b4ff0956d7cf6b611e402a0dc214f788d25",
    privateKey:
      "ea52c0ff3f428fcb02f0c2a16ecbce78fc91ca26da57e96f3682ca85cab5bcea",
  },
];

// if not founc return acc 0
export function findByName(name: Username) {
  const account = accountsArray.find((acc) => acc.name === name);
  return account || { noacc: { privateKey: 0, publicKey: 0 } };
}

// export type Account = {
//   privateKey: string;
//   publicKey: string;
// };

// export type Accounts = {
//   [key in Username]: Account;
// };
// export const accountsList: Accounts = {
//   alice: {
//     privateKey:
//       "64c15bd6c37f43ce818aced3c76699405047631e55ddae3eea5afa490872b7bc",
//     publicKey:
//       "030dd4bdeb9e7e6f4e62678ec9c57db844df872db1581f9e739fc01f8b105b15e5",
//   },
//   jhon: {
//     privateKey:
//       "51450f3f620fdfc0ac6d000130ca8fd23563626f7f3c747ab76519c3f019addb",
//     publicKey:
//       "020f30cf0c0d624ce8c07cbac2e651adf23145ac1d959ef6192cb26b9516c6fe19",
//   },
//   eve: {
//     privateKey:
//       "0a4f1687d420a942f42ab9a7230bf6ff63ba2e45bd0b666f7b62d386524affc1",
//     publicKey:
//       "02d9e90735ebb069e7da9ee4d9abf2e98b239ce3ea1fc6bd031a0c27b5a92fb01a",
//   },
//   chris: {
//     privateKey:
//       "78e8f83ff2f082c76f7d64389e61bd1e0751a454d6930d6835c3d465123d9099",
//     publicKey:
//       "03ac782f126633ccb25cb3d2e864949cbbad76c7ef7529e4523befb9ce6be7390d",
//   },
//   anabelle: {
//     privateKey:
//       "ea52c0ff3f428fcb02f0c2a16ecbce78fc91ca26da57e96f3682ca85cab5bcea",
//     publicKey:
//       "0309a29ef7ef4f62433197863ff1dc3b4ff0956d7cf6b611e402a0dc214f788d25",
//   },
// };
