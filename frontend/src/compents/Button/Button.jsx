import React from "react";

const Button = ({
  btnType,
  btnText = "",
  btnBgColor = "red",
  btnTextColor = "green",
  btnIcon = "",
  onClick = () => {},
}) => {
  return (
      <button
        type={btnType}
        onClick={onClick}
        className={`p-1 px-5 text-xl bg-${btnBgColor}-600 text-${btnTextColor} rounded-md hover:bg-black hover:text-white`}
      >
        <span>{btnIcon}</span>{btnText}
      </button>
  );
};

export default Button;
