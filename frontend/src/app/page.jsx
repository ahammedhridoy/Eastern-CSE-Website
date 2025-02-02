import AlbumBlock from "./components/AlbumBlock/AlbumBlock";
import AlumniBlock from "./components/AlumniBlock/AlumniBlock";
import EventBlock from "./components/EventBlock/EventBlock";
import FacultyBlock from "./components/FacultyBlock/FacultyBlock";
import ProgramBlock from "./components/ProgramBlock/ProgramBlock";
import Slider from "./components/Slider/Slider";
import TestimonialBlock from "./components/TestimonialBlock/TestimonialBlock";
import WelcomeBlock from "./components/WelcomeBlock/WelcomeBlock";

export const metadata = {
  title: "Eastern University CSE Department",
  description: "",
};

export default function Home() {
  return (
    <main className="main">
      <Slider />
      <div className="container flex flex-col items-center justify-center">
        <WelcomeBlock />
        <ProgramBlock />
        <EventBlock />
        <FacultyBlock />
        <TestimonialBlock />
        <AlbumBlock />
        <AlumniBlock />
      </div>
    </main>
  );
}
