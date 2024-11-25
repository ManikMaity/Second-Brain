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
