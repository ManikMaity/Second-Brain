import React from "react";

interface PropsType {
    customStyle ?: object;
  inputType?: "text" | "password" | "email";
  value: string | number;
  placeholder: string;
  onChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ value, placeholder, onChange, inputType, customStyle }: PropsType) {
  return (
    <input
    style={customStyle ?? {}}
        className="w-full p-2 rounded-md outline-violet-600"
      type={inputType || "text"}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default Input;
