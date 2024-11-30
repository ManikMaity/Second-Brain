import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import Select, { OptionObjectType } from "../SelectDropdown/Select";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation } from "react-query";
import addContentService from "../../services/addContentService";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/utils";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AddContentModel(props : {refresh : <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>}) {


  type ContentType = "link" | "tweet" | "video";
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [contentType, setContentType] = useState<ContentType>("link");

    function onTitleChange(e : React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function onLinkChange(e : React.ChangeEvent<HTMLInputElement>) {
        setLink(e.target.value);
    }

    function onSelectChange (e : React.ChangeEvent<HTMLSelectElement>) {
        setContentType(e.target.value as ContentType);
    }

    function clearAllData () {
        setTitle("");
        setLink("");
        setContentType("link");
    }

    const mutation = useMutation(addContentService, {
      onSuccess : (data) => {
        toast.success(data?.message || "Successful");
        clearAllData();
        props.refresh();
      },
      onError :  (error) => {
        toast.error(getErrorMessage(error));
      }
    })

    async function handleContentSubmit() {
      mutation.mutate({title, link, type : contentType});
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
      <Select optionsData={optionsData} selectValue={contentType} onSelectChange={onSelectChange}/>
      <div className="grid grid-flow-col gap-3">
        <Button variant="secondary" text="Clear" onClick={clearAllData}/>
        <Button variant="primary" text="Submit" loading={mutation.isLoading} onClick={handleContentSubmit}/>
      </div>
    </div>
  );
}

export default AddContentModel;
