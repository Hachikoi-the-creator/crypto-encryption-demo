import { Username } from "@/utils/accounts";
import { ChangeEvent } from "react";

type Props = {
  updateRecipient: (e: ChangeEvent<HTMLSelectElement>) => void;
  accNames: Username[];
};

export default function SelectRecipient(props: Props) {
  const { accNames, updateRecipient } = props;

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
