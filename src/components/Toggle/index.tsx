import * as React from "react";
import { BEMHelper } from "../../utils/bem-helper";

import './styles.scss'
export interface IToggleButton {
  name?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  checkedValue?: boolean;
  className?: string;
}

export const Toggle: React.FC<IToggleButton> = ({
  name = "input",
  checkedValue = false,
  inputProps,
  className,
}) => {
  const [isChecked, setIsChecked] = React.useState(checkedValue);

  const classHelper:any = BEMHelper("toggle");

  const toggleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className={classHelper(className)}>
      <input
        onChange={toggleCheck}
        defaultChecked={isChecked}
        className={classHelper("input")}
        id={"toggle-btn-" + name}
        type="checkbox"
        name={name}
        {...inputProps}
      />
      <label
        className={classHelper("label", [isChecked ? "active" : ""])}
        htmlFor={"toggle-btn-" + name}
      >
        <span />
      </label>
    </div>
  );
};
