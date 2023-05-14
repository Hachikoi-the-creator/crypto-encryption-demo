import { accountsArray } from "@/data/accounts";
import { AccountContext } from "@/pages";
import { ChangeEvent, useContext } from "react";

export default function SelectSender() {
  const { sender, setSender } = useContext(AccountContext);

  // don't need any kind of confirmation since can only be within valid range :D
  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = +e.target.value || 0;
    setSender(accountsArray[index]);
  };

  return (
    <div className="select-sender">
      <label>
        From
        <select name="account" id="account" onChange={selectHandler}>
          {accountsArray.map((e, i) => (
            <option value={i} key={e.privateKey}>
              {e.name[0].toUpperCase() + e.name.slice(1)}'s account
            </option>
          ))}
        </select>
      </label>
      <p>
        {`0x${sender.publicKey.slice(0, 5)} ... ${sender.publicKey.slice(
          sender.publicKey.length - 7
        )}`}
      </p>
    </div>
  );
}
