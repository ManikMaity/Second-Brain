
function SpinnerLoader({radius, color} : {radius?: number, color?: string}) {
  return (
    <div className="">
    <div className={`w-${radius || 6} h-${radius || 6} border-4 border-[${color || "white"}] border-t-transparent rounded-full animate-spin`}></div>
  </div>
  );
}

export default SpinnerLoader;
