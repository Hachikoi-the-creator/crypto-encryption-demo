import TxForm from "@/components/TxForm";
import { Account, accountsArray } from "@/data/accounts";
import { axiosBase } from "@/utils/axiosBase";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type AccountContextT = {
  sender: Account;
  recipient: Account;
  availableRecipients: Account[];
  setSender: Dispatch<SetStateAction<Account>>;
  setRecipient: Dispatch<SetStateAction<Account>>;
  setAvailableRecipients: Dispatch<SetStateAction<Account[]>>;
};

// values only needed for extra type inference
export const AccountContext = createContext<AccountContextT>({
  sender: accountsArray[0],
  recipient: accountsArray[0],
  availableRecipients: [accountsArray[0]],
  setSender: () => {},
  setRecipient: () => {},
  setAvailableRecipients: () => {},
});

export default function App() {
  const [sender, setSender] = useState(accountsArray[0]);
  const [recipient, setRecipient] = useState(accountsArray[0]);
  const [availableRecipients, setAvailableRecipients] = useState(
    accountsArray.slice(1)
  );

  const getAccountsBalances = async (sender: string, recipient: string) => {
    try {
      const senderAcc: { data: Account | undefined } = await axiosBase(
        `/balances?name=${sender}`
      );
      const recipientAcc: { data: Account | undefined } = await axiosBase(
        `/balances?name=${recipient}`
      );

      if (senderAcc.data) setSender(senderAcc.data);
      if (recipientAcc.data) setRecipient(recipientAcc.data);
    } catch (error) {
      console.error("trouble fetching account details");
    }
  };

  useEffect(() => {
    getAccountsBalances("alice", "jhon");
  }, []);

  return (
    <AccountContext.Provider
      value={{
        sender,
        recipient,
        availableRecipients,
        setSender,
        setRecipient,
        setAvailableRecipients,
      }}
    >
      <TxForm />
    </AccountContext.Provider>
  );
}
