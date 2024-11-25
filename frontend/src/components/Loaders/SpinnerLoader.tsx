import React from "react";

function SpinnerLoader({radius} : {radius?: number}) {
  return (
    <div className={`animate-spin inline-block size-${radius || 6} border-[3px] border-current border-t-transparent text-white rounded-full`} role="status" aria-label="loading">
  </div>
  );
}

export default SpinnerLoader;
