import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import User from "../../../../../@Types/user";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

interface SelectMultiProps {
  users: User[];
}

const SelectMulti = (props: SelectMultiProps) => {
  const [selected, setSelected] = useState([]);

  return (
    <MultiSelect
      options={options}
      value={selected}
      onChange={setSelected}
      labelledBy="Select"
    />
  );
};

export default SelectMulti;
