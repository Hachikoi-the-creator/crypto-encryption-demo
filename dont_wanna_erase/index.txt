import TxForm from "@/components/TxForm";
import { Account, accountsArray } from "@/utils/accounts";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type AccountContextT = {
  sender: Account;
  recipient: Account;
  setSender: Dispatch<SetStateAction<Account>>;
  setRecipient: Dispatch<SetStateAction<Account>>;
};

export const AccountContext = createContext<AccountContextT>({
  sender: accountsArray[0],
  recipient: accountsArray[1],
  setSender: () => {},
  setRecipient: () => {},
});

export default function App() {
  const [sender, setSender] = useState(accountsArray[0]);
  const [recipient, setRecipient] = useState(accountsArray[1]);

  return (
    <AccountContext.Provider
      value={{ sender, recipient, setSender, setRecipient }}
    >
      <TxForm />
    </AccountContext.Provider>
  );
}
