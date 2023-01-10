import * as React from "react";
import { BEMHelper } from "../utils/bem-helper";
import "./style.scss";

const classHelper:any = BEMHelper("overlay");

interface IOverlay {
  visible?: boolean;
  callback?: (name: boolean) => ReturnType<(...args: any) => any>;
}

export const Overlay: React.FC<IOverlay> = ({
  visible = true,
  callback,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (callback) {
      callback(false);
      return;
    }
  };
  return (
    
    <div
      className={classHelper("", [visible ? "open" : ""])}
      onClick={handleClick}
      tabIndex={1}
    />
  );
};

Overlay.displayName = "Overlay";
