export function getFormatedDate(date: string): string {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

export function ytUrlToEmbed(url: string): string {
  if (url.includes("shorts")) {
    return url.replace("shorts", "embed");
  }
  if (url.includes("v=")) {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("youtu.be")){
    return url.replace("youtu.be", "www.youtube.com/embed");
  }

  return url;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getErrorMessage (error : any) : string{
  const err = error?.response?.data;
  if (Array.isArray(err?.error) && err?.error?.length > 0){
    return err.error[0];
  }
  else if (err.message){
    return err.message;
  }
  else {
    return "Something went wrong";
  }
}