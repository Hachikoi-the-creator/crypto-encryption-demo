import { accountsArray } from "@/data/accounts";
import { AccountContext } from "@/pages";
import { ChangeEvent, RefObject, useContext } from "react";

type Props = { amountRef: RefObject<HTMLInputElement> };

export default function SelectSender({ amountRef }: Props) {
  const { sender, setSender, setRecipient, setAvailableRecipients } =
    useContext(AccountContext);

  // don't need any kind of confirmation since can only be within valid range :D
  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const index = +e.target.value || 0;
    const selectedSender = accountsArray[index];
    // arr of accounts without the one that's the current sender
    const updatedOptions = accountsArray.filter(
      (acc) => acc.name !== selectedSender.name
    );

    setSender(selectedSender);
    setRecipient(updatedOptions[0]);
    setAvailableRecipients(updatedOptions);
  };

  return (
    <div className="select-sender">
      <label className="select-field">
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
      <p>Balace {sender.balance || 0}</p>

      <label className="label-input">
        Amount
        <input type="number" ref={amountRef} />
      </label>
    </div>
  );
}
