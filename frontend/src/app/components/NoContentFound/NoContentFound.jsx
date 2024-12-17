import React from "react";

const NoContentFound = ({ mesage, height }) => {
  return (
    <div className={`flex items-center justify-center min-h-${height}`}>
      <h4 className="text-2xl font-semibold">{mesage}</h4>
    </div>
  );
};

export default NoContentFound;
