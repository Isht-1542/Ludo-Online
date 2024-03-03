import { useState } from "react";
export default () => {
  let initialVal = {
    "blue":[81,82,83,84],
    "red":[85,86,87,88],
    "green":[89,90,91,92],
    "yellow":[93,94,95,96],
  };

  const [value, setValue] = useState(initialVal);
  let returnObject = {
    board: value,
    setValue,
  };
  return returnObject;
};
