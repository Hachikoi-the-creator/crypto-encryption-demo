import { accountsArray } from "@/data/accounts";
import { AccountContext } from "@/pages";
import { ChangeEvent, useContext } from "react";

export default function SelectRecipient() {
  const { sender, setRecipient } = useContext(AccountContext);

  // arr of names without the one that's the current sender
  const accNames = accountsArray
    .map((acc) => acc.name)
    .filter((name) => name !== sender.name);

  const updateRecipient = (e: ChangeEvent<HTMLSelectElement>) => {
    const user = accountsArray.find((acc) => acc.name === e.target.value);

    if (user) return setRecipient(user);
    console.error("couldn't find the recipient somehow");
  };

  return (
    <label className="select-recipient">
      To
      <select onChange={updateRecipient}>
        {accNames.map((name) => (
          <option value={name} key={name}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}
