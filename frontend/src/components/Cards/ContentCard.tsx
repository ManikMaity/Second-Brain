import { FiTwitter } from "react-icons/fi";
import Button from "../Buttons/Button";
import { IoMdShare } from "react-icons/io";
import { MdDeleteOutline} from "react-icons/md";
import { getErrorMessage, getFormatedDate, ytUrlToEmbed } from "../../utils/utils";
import React from "react";
import { IoDocumentTextOutline, IoLinkOutline } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa6";
import { useMutation } from "react-query";
import deleteContentService from "../../services/deleteContentService";
import { toast } from "react-toastify";

type ContentType = "doc" | "video" | "link" | "tweet";

export interface ContentCardProps {
  _id: string;
  type: ContentType;
  link: string;
  title: string;
  tags: string[];
  createdAt?: string;
  viewerCard ?: boolean
}

interface ContentCardPropsWithRefresh extends ContentCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refresh? : any
}

function ContentCard(props: ContentCardPropsWithRefresh) {
  function getIconFromType(contentType: ContentType): React.ReactNode {
    switch (contentType) {
      case "doc":
        return <IoDocumentTextOutline />;
        break;
      case "tweet":
        return <FiTwitter />;
        break;
      case "link":
        return <IoLinkOutline />;
        break;
      default:
        return <FaYoutube />;
        break;
    }
  }

  function handleShareClick() {
    window.open(props.link, "_blank");
  }

  const deleteMutation = useMutation(deleteContentService, {
    onSuccess : (data) => {
      console.log(data);
      toast.success(data?.message || "Successful");
      props.refresh();
    },
    onError :  (error) => {
      toast.error(getErrorMessage(error));
    }
  });

  function handleDeleteContent() {
    const sure = confirm("Are you sure you want to delete this content?");
    if (!sure) return;
    deleteMutation.mutate(props._id);
  }

  return (
    <div className="bg-white rounded-md max-h-[400px] overflow-y-scroll overflow-x-hidden w-full md:w-[280px] border border-gray-300 gap-2 flex flex-col text-gray-900 shadow-sm px-3 py-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-base justify-start gap-2 leading-none font-semibold">
          <div>{getIconFromType(props.type)}</div>
          <p>{props.title || "Card Title"}</p>
        </div>
        <div className="flex gap-1">
          <Button
            text=""
            onClick={handleShareClick}
            startIcon={<IoMdShare />}
            variant="ghost"
            size="sm"
            textHidden={true}
          />
         {!props.viewerCard && <Button
            text=""
            onClick={handleDeleteContent}
            startIcon={<MdDeleteOutline />}
            variant="ghost"
            size="sm"
            textHidden={true}
          />}
        </div>
      </div>

      <div className="w-full rounded-sm">
        {props?.type === "video" && (
          <iframe
            className="w-full"
            src={`${ytUrlToEmbed(props.link)}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {props?.type === "tweet" && (
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {props?.type === "link" && (
          <div className="flex gap-2 flex-col">
            <p className="text-black font-bold">Link</p>
            <a
              href={`${props.link}`}
              target="_blank"
              className="text-violet-900 hover:underline"
            >
              {props?.link}
            </a>
          </div>
        )}
      </div>

      {props?.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {props?.tags.map((tag, index) => (
            <p
              key={index}
              className="text-xs inline-block text-violet-900 bg-violet-200 px-2 rounded-full"
            >
              {tag}
            </p>
          ))}
        </div>
      )}

      <div className="text-xs mt-1 text-gray-800">
        {props?.createdAt && (
          <p>{`Createed on ${getFormatedDate(props?.createdAt)}`}</p>
        )}
      </div>
    </div>
  );
}

export default ContentCard;
