import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import Select, { OptionObjectType } from "../SelectDropdown/Select";

function AddContentModel() {

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [contentType, setContentType] = useState("link");

    function onTitleChange(e : React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function onLinkChange(e : React.ChangeEvent<HTMLInputElement>) {
        setLink(e.target.value);
    }

    const optionsData : OptionObjectType[] = [
      {value : "link", text : "Link"},
      {value : "tweet", text : "Tweet/X-Post"},
      {value : "video", text : "Youtube Video"}
    ]



  return (
    <div className="w-[70%] max-w-[400px] bg-gray-200 rounded-md px-4 py-5 flex gap-3 flex-col">
      <Input value={title} placeholder="Enter title here..." onChange={onTitleChange} />
      <Input value={link} placeholder="Enter link here.." onChange={onLinkChange} />
      <Select optionsData={optionsData}/>
      <div className="grid grid-flow-col gap-3">
        <Button variant="secondary" text="Clear"/>
        <Button variant="primary" text="Submit"/>
      </div>
    </div>
  );
}

export default AddContentModel;
