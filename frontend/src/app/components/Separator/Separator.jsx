import React from "react";

const Separator = ({ width = "w-20", position = "justify-center" }) => {
  return (
    <div className="my-4 separator">
      <div className={`flex ${position}`}>
        <div className={`bg-[var(--primary-color)] ${width} h-[3px]`}></div>
      </div>
    </div>
  );
};

export default Separator;
