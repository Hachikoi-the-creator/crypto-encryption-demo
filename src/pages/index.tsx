import Atrocity from "@/comps/Atrocity";
import { Account, accountsArray } from "@/utils/accounts";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type AccountContextT = {
  account: Account;
  setAccount: Dispatch<SetStateAction<Account>>;
};

export const AccountContext = createContext<AccountContextT>({
  account: accountsArray[0],
  setAccount: () => {},
});

export default function App() {
  const [account, setAccount] = useState(accountsArray[0]);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      <Atrocity />
    </AccountContext.Provider>
  );
}
