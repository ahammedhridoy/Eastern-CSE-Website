import Slider from "./components/Slider/Slider";
import EventBlock from "./components/EventBlock/EventBlock";
import FacultyBlock from "./components/FacultyBlock/FacultyBlock";
import GalleryBlock from "./components/GalleryBlock/GalleryBlock";
import TestimonialBlock from "./components/TestimonialBlock/TestimonialBlock";
import AlumniBlock from "./components/AlumniBlock/AlumniBlock";
export default function Home() {
  return (
    <main className="main">
      <Slider />
      <div className="container flex flex-col items-center justify-center">
        <EventBlock />
        <FacultyBlock />
        <TestimonialBlock />
        <GalleryBlock />
        <AlumniBlock />
      </div>
    </main>
  );
}
