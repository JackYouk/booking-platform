import React from "react";

const Button = ({ text, tailwind }) => {
  return <div className={tailwind}>{text}</div>;
};

export default Button;
