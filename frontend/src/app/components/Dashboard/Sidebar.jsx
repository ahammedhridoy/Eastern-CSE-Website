import {
  Dashboard,
  Person,
  Article,
  ExitToApp,
  HelpOutline,
} from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div
      className={`fixed top-[69px] left-0 bg-gray-100 p-4 w-64 min-h-screen`}
    >
      <div className="flex items-center justify-center mb-6 bg-black">
        <Image src="/images/global/cse.png" alt="Logo" width={40} height={40} />
      </div>
      <ul className="space-y-4">
        <Link
          href="/dashboard"
          className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500"
        >
          <Dashboard className="mr-3" /> Dashboard
        </Link>
        <Link
          href="/dashboard/manage-user"
          className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500"
        >
          <Person className="mr-3" /> Users
        </Link>
        <Link
          href="/dashboard/manage-slider"
          className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500"
        >
          <ImageIcon className="mr-3" /> Sliders
        </Link>
        <Link
          href="/dashboard/manage-blog"
          className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500"
        >
          <Article className="mr-3" /> Blogs
        </Link>
        <Link
          href="/dashboard/manage-faculty"
          className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500"
        >
          <SupervisedUserCircleIcon className="mr-3" /> Faculties
        </Link>
        <Link
          href="/dashboard/manage-album"
          className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500"
        >
          <PhotoLibraryIcon className="mr-3" /> Albums
        </Link>
        <Link
          href="/dashboard/manage-teacher-testimonial"
          className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500"
        >
          <FormatQuoteIcon className="mr-3" />
          Teacher's Testimonials
        </Link>
        <Link
          href="/dashboard/manage-alumni-testimonial"
          className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500"
        >
          <FormatQuoteIcon className="mr-3" /> Alumni's Testimonials
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
