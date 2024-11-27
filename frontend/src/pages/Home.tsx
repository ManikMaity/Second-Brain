import React, { useState } from "react";
import ContentCard, { ContentCardProps } from "../components/Cards/ContentCard";
import ModelContainer from "../components/Models/ModelContainer";
import AddContentModel from "../components/Models/AddContentModel";
import Sidebar from "../components/Sidebar/Sidebar";
import Button from "../components/Buttons/Button";
import { FaPlus } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import SpinnerLoader from "../components/Loaders/SpinnerLoader";
import useUserStore from "../store/useStore";
import { useQuery } from "react-query";
import getAllContentService from "../services/getAllContentService";
import { toast } from "react-toastify";
import { getErrorMessage } from "../utils/utils";

function Home() {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    ["content"],
    getAllContentService,
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      onError: (error) => {
        toast.error(getErrorMessage(error))
      }
    }
  );

  const [sidebarClosed, setSidebarClosed] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { user } = useUserStore();
  console.log(user);

  function handleModelClose() {
    setOpenCreateModal(false);
  }

  return (
    <div className="h-screen w-full bg-gray-100 flex justify-end">
      {openCreateModal && (
        <ModelContainer onClose={handleModelClose}>
          <AddContentModel refresh={refetch}/>
        </ModelContainer>
      )}
      <Sidebar
        closeSidebar={sidebarClosed}
        setCloseSidebar={setSidebarClosed}
      />
      <div
        className={`h-screen transition-all duration-500 ${
          sidebarClosed ? "w-[100%]" : "w-[80%]"
        } p-6 bg-gray-200`}
      >
        <div className="flex flex-col sm:flex-row justify-between h-[12%] sm:h-[6%] sm:items-center gap-2 mb-6">
          <h1 className="font-bold text-2xl">All Notes</h1>
          <div className="flex gap-2">
            <Button
              text="Add Content"
              variant="primary"
              size="md"
              onClick={() => {
                setOpenCreateModal(true);
              }}
              startIcon={<FaPlus />}
            />
            <Button
              text="Share Brain"
              variant="secondary"
              size="md"
              onClick={() => {
                alert("Hoi there");
              }}
              startIcon={<IoMdShare />}
            />
          </div>
        </div>
        {isLoading && <div className="w-full mt-12 md:mt-0 h-auto md:h-[92%] grid place-content-center">
          <SpinnerLoader radius={12} color="#8b5cf6" />
        </div>}
        {isError && <div className="w-full mt-12 md:mt-0 h-auto md:h-[92%] grid place-content-center"><p className="text-base md:text-lg font-bold text-red-500">Something went wrong</p></div>}
        {isSuccess && (
          <div className="w-full h-auto md:h-[92%] overflow-y-scroll gap-2 flex justify-center flex-wrap">
            {data?.data?.map((item: ContentCardProps) => {
              return <ContentCard refresh={refetch} _id={item._id} key={item._id} type={item.type || "link"} title={item.title || "Untitled"} link={item.link || ""} tags={item.tags} createdAt={item.createdAt}/>
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
