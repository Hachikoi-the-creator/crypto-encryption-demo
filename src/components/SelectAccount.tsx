import { AccountContext } from "@/pages";
import { accountsArray } from "@/utils/accounts";
import { ChangeEvent, useContext } from "react";

export default function SelectAccount() {
  const { account, setAccount } = useContext(AccountContext);

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = +e.target.value || 0;
    if (index < 0 || index >= accountsArray.length)
      return console.error("invalid option somehow...");

    setAccount(accountsArray[index]);
  };

  return (
    <div>
      <label htmlFor="account">Select account</label>
      <select name="account" id="account" onChange={selectHandler}>
        {accountsArray.map((e, i) => (
          <option value={i} key={e.privateKey}>
            Account {i + 1}
          </option>
        ))}
      </select>
      <p>
        {`0x${account.publicKey.slice(0, 5)} ... ${account.publicKey.slice(
          account.publicKey.length - 7
        )}`}
      </p>
    </div>
  );
}
