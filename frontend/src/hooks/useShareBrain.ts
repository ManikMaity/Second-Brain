import { useRef } from "react";
import { useMutation, useQuery } from "react-query";
import shareBrainService from "../services/shareBrainService";
import { toast } from "react-toastify";
import { getErrorMessage } from "../utils/utils";
import getLinkDataService from "../services/getLinkDataService";

function useShareBrain() {

const shareLinkHash = useRef("");

  const {
    data: linkData,
    isSuccess: isLinkDataSuccess,
    isError: isLinkDataError,
    isLoading: isLinkDataLoading,
    refetch,
  } = useQuery("link", getLinkDataService, {
    staleTime: 10 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
    onSuccess: (data) => {
        shareLinkHash.current = data?.data?.link?.hash || "";
    }
  });

  const shareMutation = useMutation(shareBrainService, {
    onSuccess: (data) => {
      console.log(data);
      toast.success(data?.message || "Successful");
      refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error(getErrorMessage(error));
    },
  });

  function handleBrainShare(share: boolean) : void {
    const message = share ? "Are you sure you want to share your brain?" : "Are you sure you want to remove your public brain?";
    const sure = confirm(message);
    if (!sure) return;
    shareMutation.mutate(share);
  }


  return {
    linkData,
    isLinkDataSuccess,
    isLinkDataLoading,
    isLinkDataError,
    shareLinkHash,
    handleBrainShare
  }
}

export default useShareBrain;
