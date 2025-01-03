"use client";
import { useRouter } from "next/navigation";
import { Dashboard, Person, Article } from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [active, setActive] = useState("/dashboard"); // Default active route

  // Menu items for the sidebar
  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <Dashboard className="mr-3" />,
    },
    {
      label: "Users",
      href: "/dashboard/manage-user",
      icon: <Person className="mr-3" />,
    },
    {
      label: "Sliders",
      href: "/dashboard/manage-slider",
      icon: <ImageIcon className="mr-3" />,
    },
    {
      label: "Blogs",
      href: "/dashboard/manage-blog",
      icon: <Article className="mr-3" />,
    },
    {
      label: "About Sliders",
      href: "/dashboard/manage-about-slider",
      icon: <ImageIcon className="mr-3" />,
    },
    {
      label: "Faculties",
      href: "/dashboard/manage-faculty",
      icon: <SupervisedUserCircleIcon className="mr-3" />,
    },
    {
      label: "Albums",
      href: "/dashboard/manage-album",
      icon: <PhotoLibraryIcon className="mr-3" />,
    },
    {
      label: "Account",
      href: "/dashboard/manage-account",
      icon: <AccountCircleIcon className="mr-3" />,
    },
    {
      label: "Teacher's Testimonials",
      href: "/dashboard/manage-teacher-testimonial",
      icon: <FormatQuoteIcon className="mr-3" />,
    },
    {
      label: "Alumni's Testimonials",
      href: "/dashboard/manage-alumni-testimonial",
      icon: <FormatQuoteIcon className="mr-3" />,
    },
  ];

  // Handle navigation
  const handleNavigation = (href) => {
    setActive(href); // Update active state
    router.push(href); // Navigate to the new route
  };

  useEffect(() => {
    // Ensure the current path is correctly set as active on initial load
    setActive(window.location.pathname);
  }, []);

  return (
    <div
      className={`fixed top-[69px] left-0 bg-gray-100 p-4 w-[300px] min-h-screen`}
    >
      <div className="flex items-center justify-center mb-6 bg-black">
        <Image src="/images/global/cse.png" alt="Logo" width={40} height={40} />
      </div>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => handleNavigation(item.href)}
              className={`flex items-center text-gray-600 cursor-pointer hover:text-blue-500 ${
                active === item.href ? "active" : ""
              }`}
            >
              {item.icon} {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
