import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getBrainDataService } from "../services/getBrainDataService";
import Sidebar from "../components/Sidebar/Sidebar";
import ContentCard, { ContentCardProps } from "../components/Cards/ContentCard";
import TilesLoader from "../components/Loaders/TilesLoader";
import { toast } from "react-toastify";
import { getErrorMessage } from "../utils/utils";

function Brain() {
  const { hash } = useParams();
  const [sidebarClosed, setSidebarClosed] = React.useState(false);
  const [filterType, setFilterType] = useState("all");


  const { data, isLoading, isSuccess, isError } = useQuery(
    ["brain", hash, filterType],
    () => getBrainDataService(hash, filterType),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      onError : (error) => {
        toast.error(getErrorMessage(error));
      }
    }
  );

  return (
    <div className="h-screen w-screen flex justify-end">
      <Sidebar
        closeSidebar={sidebarClosed}
        setCloseSidebar={setSidebarClosed}
        setFilterType={setFilterType}
        isViewer={true}
      />
      <div
        className={`h-screen transition-all duration-500 ${
          sidebarClosed ? "w-[100%]" : "w-[80%]"
        } p-6 bg-gray-200`}
      >
        <div className="flex flex-col sm:flex-row justify-between h-[6%] sm:items-center gap-2 md:mb-4">
          {isSuccess && <h1 className="font-bold text-xl md:text-2xl">Second Brain of <a href={`mailto:${data?.data?.creator?.email}`} target="_blank" className="hover:underline text-violet-600">{data?.data?.creator?.username}</a></h1>}
          </div>
        
          {isLoading && (
          <div className="w-full mt-12 md:mt-0 h-auto md:h-[92%] grid place-content-center">
           <TilesLoader/>
          </div>
        )}
        {isError && (
          <div className="w-full mt-12 md:mt-0 h-auto md:h-[92%] grid place-content-center">
            <p className="text-base md:text-lg font-bold text-red-500">
              Something went wrong
            </p>
          </div>
        )}
        {isSuccess && (
          <div className="w-full h-auto md:h-[92%] overflow-y-scroll gap-2 flex flex-wrap">
            {data?.data?.content?.map((item: ContentCardProps) => {
              return (
                <ContentCard
                  _id={item._id}
                  key={item._id}
                  type={item.type || "link"}
                  title={item.title || "Untitled"}
                  link={item.link || ""}
                  tags={item.tags}
                  createdAt={item.createdAt}
                  viewerCard={true}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Brain;
