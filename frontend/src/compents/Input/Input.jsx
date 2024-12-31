import React from "react";

const Input = ({
  inputType = "text",
  placeHolder = "",
  id = "",
  value='',
  onChange = () => {},
}) => {
  
  return (
    <input
      type={inputType}
      placeholder={placeHolder}
      id={id}
      value={value}
      className="p-2 rounded-lg hover:border-violet-950 border-2 hover:border-2 border-gray-700 w-full"
      onChange={onChange}
    ></input>
  );
};

export default Input;
