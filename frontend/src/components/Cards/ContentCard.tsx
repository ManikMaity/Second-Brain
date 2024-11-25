import { FiTwitter } from "react-icons/fi";
import Button from "../Buttons/Button";
import { IoMdShare } from "react-icons/io";
import { MdDeleteOutline} from "react-icons/md";
import { getFormatedDate, ytUrlToEmbed } from "../../utils/utils";
import React from "react";
import { IoDocumentTextOutline, IoLinkOutline } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa6";

type ContentType = "doc" | "video" | "link" | "tweet";

export interface ContentCardProps {
  contentType: ContentType;
  link: string;
  cardTitle: string;
  tags: string[];
  createdAt?: string;
}

function ContentCard(props: ContentCardProps) {
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

  return (
    <div className="bg-white rounded-md max-h-[400px] overflow-y-scroll overflow-x-hidden w-full md:w-[280px] border border-gray-300 gap-2 flex flex-col text-gray-900 shadow-sm px-3 py-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-base justify-start gap-2 leading-none font-semibold">
          <div>{getIconFromType(props.contentType)}</div>
          <p>{props.cardTitle || "Card Title"}</p>
        </div>
        <div className="flex gap-1">
          <Button
            text=""
            startIcon={<IoMdShare />}
            variant="ghost"
            size="sm"
            textHidden={true}
          />
          <Button
            text=""
            startIcon={<MdDeleteOutline />}
            variant="ghost"
            size="sm"
            textHidden={true}
          />
        </div>
      </div>

      <div className="w-full rounded-sm">
        {props?.contentType === "video" && (
          <iframe
            className="w-full"
            src={`${ytUrlToEmbed(props.link)}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {props?.contentType === "tweet" && (
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {props?.contentType === "link" && (
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
