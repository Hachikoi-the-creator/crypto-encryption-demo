import { Username } from "@/utils/accounts";
import { RefObject } from "react";

type Props = {
  recipientRef: RefObject<HTMLSelectElement>;
  accNames: Username[];
};

export default function SelectRecipient(props: Props) {
  const { recipientRef, accNames } = props;

  return (
    <label>
      To
      <select ref={recipientRef}>
        {accNames.map((name) => (
          <option value={name} key={name}>
            {name}
          </option>
        ))}
      </select>
      <input type="text" />
    </label>
  );
}
