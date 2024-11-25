import { FiTwitter } from "react-icons/fi";
import Button from "../Buttons/Button";
import { IoMdShare } from "react-icons/io";
import { MdDeleteOutline, MdOndemandVideo } from "react-icons/md";
import { getFormatedDate } from "../../utils/utils";
import React from "react";
import { IoDocumentTextOutline, IoLinkOutline } from "react-icons/io5";

type ContentType = "doc" | "video" | "link" | "tweet";

export interface ContentCardProps {
  contentType: ContentType;
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
        return <MdOndemandVideo />;
        break;
    }
  }

  return (
    <div className="bg-white rounded-md min-h-[200px] w-[200px] text-gray-900 shadow-sm px-3 py-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-sm justify-start gap-2 leading-none font-semibold">
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
