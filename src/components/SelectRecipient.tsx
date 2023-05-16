import { accountsArray } from "@/data/accounts";
import { AccountContext } from "@/pages";
import { ChangeEvent, useContext, useEffect } from "react";

export default function SelectRecipient() {
  const { sender, recipient, setRecipient, availableRecipients } =
    useContext(AccountContext);

  const updateRecipient = (e: ChangeEvent<HTMLSelectElement>) => {
    const user = accountsArray.find((acc) => acc.name === e.target.value);

    if (user) return setRecipient(user);
    console.error("couldn't find the recipient somehow");
  };

  return (
    <div className="select-sender">
      <label className="select-field">
        To
        <select name="recipient" onChange={updateRecipient}>
          {availableRecipients.map((e, i) => (
            <option value={i} key={i}>
              {e.name[0].toUpperCase() + e.name.slice(1)}'s account
            </option>
          ))}
        </select>
      </label>
      <p>
        {`0x${recipient.publicKey.slice(0, 5)} ... ${recipient.publicKey.slice(
          recipient.publicKey.length - 7
        )}`}
      </p>
      <p>Balace {recipient.balance || 0}</p>
    </div>
  );
}
