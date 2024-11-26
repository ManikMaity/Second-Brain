import React from "react";

export interface OptionObjectType {
    value : string;
    text : string;
}

interface PropsType {
    optionsData : OptionObjectType[]
}


function Select({optionsData} : PropsType) {
  return (
    <select
      id="countries"
      className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-600 block w-full p-2.5"
    >
      {optionsData?.map((option, index) => <option key={index} value={option?.value}>{option?.text}</option>)}
    </select>
  );
}

export default Select;
