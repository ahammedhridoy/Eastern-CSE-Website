import React from "react";
import EventCard from "@/app/components/EventCard/EventCard";
import Separator from "../Separator/Separator";
const EventBlock = () => {
  return (
    <div className="my-10 event">
      <h1 className="text-5xl text-[var(--black-color)] font-bold text-center">
        Events & News
      </h1>
      <Separator width="w-20" position="justify-center" />
      {/* Cards */}
      <EventCard />
    </div>
  );
};

export default EventBlock;
