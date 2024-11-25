import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Buttons/Button";

function AddContentModel() {

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    function onTitleChange(e : React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function onLinkChange(e : React.ChangeEvent<HTMLInputElement>) {
        setLink(e.target.value);
    }



  return (
    <div className="w-[70%] max-w-[400px] bg-gray-200 rounded-md px-4 py-5 flex gap-3 flex-col">
      <Input value={title} placeholder="Enter title here..." onChange={onTitleChange} />
      <Input value={link} placeholder="Enter link here.." onChange={onLinkChange} />

      <div className="grid grid-flow-col gap-3">
        <Button variant="secondary" text="Clear"/>
        <Button variant="primary" text="Submit"/>
      </div>
    </div>
  );
}

export default AddContentModel;
