import AlbumBlock from "./components/AlbumBlock/AlbumBlock";
import AlumniBlock from "./components/AlumniBlock/AlumniBlock";
import EventBlock from "./components/EventBlock/EventBlock";
import FacultyBlock from "./components/FacultyBlock/FacultyBlock";
import Slider from "./components/Slider/Slider";
import TestimonialBlock from "./components/TestimonialBlock/TestimonialBlock";

export const metadata = {
  title: "Eastern CSE Department",
  description: "",
};

export default function Home() {
  return (
    <main className="main">
      <Slider />
      <div className="container flex flex-col items-center justify-center">
        <EventBlock />
        <FacultyBlock />
        <TestimonialBlock />
        <AlbumBlock />
        <AlumniBlock />
      </div>
    </main>
  );
}
