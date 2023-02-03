import { style } from "@mui/system";
import React from "react";

const Button = ({ text, style }) => {
  return <button className={style}>{text}</button>;
};

export default Button;
