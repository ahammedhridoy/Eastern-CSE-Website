import Slider from "./components/Slider/Slider";
import EventBlock from "./components/EventBlock/EventBlock";
import FacultyBlock from "./components/FacultyBlock/FacultyBlock";
import GalleryBlock from "./components/GalleryBlock/GalleryBlock";
export default function Home() {
  return (
    <main className="main">
      <Slider />
      <EventBlock />
      <FacultyBlock />
      <GalleryBlock />
    </main>
  );
}
