import EventDetailsCard from "@/app/components/EventDetailsCard/EventDetailsCard";
import React from "react";

export const metadata = {
  title: "Event Details",
  description: "",
};

const SingleEvent = () => {
  return (
    <div className="container p-10 single-event">
      <EventDetailsCard />
    </div>
  );
};

export default SingleEvent;
