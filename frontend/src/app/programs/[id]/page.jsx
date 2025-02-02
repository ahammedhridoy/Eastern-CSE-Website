import ProgramDetailsCard from "@/app/components/ProgramDetailsCard/ProgramDetailsCard";
import React from "react";

export const metadata = {
  title: "Program Details",
  description: "",
};

const SingleEvent = () => {
  return (
    <div className="container p-10 single-event">
      <ProgramDetailsCard />
    </div>
  );
};

export default SingleEvent;
