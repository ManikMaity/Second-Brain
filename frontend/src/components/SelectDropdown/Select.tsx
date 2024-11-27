import React from "react";

export interface OptionObjectType {
    value : string;
    text : string;
}

interface PropsType {
    optionsData : OptionObjectType[],
    selectValue : string,
    onSelectChange : (e : React.ChangeEvent<HTMLSelectElement>) => void
}


function Select({optionsData, selectValue, onSelectChange} : PropsType) {
  return (
    <select
    value={selectValue}
    onChange={onSelectChange}
      id="countries"
      className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-600 block w-full p-2.5"
    >
      {optionsData?.map((option, index) => <option key={index} value={option?.value}>{option?.text}</option>)}
    </select>
  );
}

export default Select;
