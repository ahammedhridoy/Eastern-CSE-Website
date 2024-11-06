"use client";
import { useState } from "react";
import {
  Dashboard,
  Person,
  ShoppingCart,
  Article,
  ExitToApp,
  HelpOutline,
} from "@mui/icons-material";
import Image from "next/image";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-100 p-4 w-64 min-h-screen transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform lg:translate-x-0 lg:static`}
    >
      <button
        className="absolute right-0 top-20 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      <div className="flex items-center justify-center mb-6">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
      </div>
      <ul className="space-y-4">
        <li className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500">
          <Dashboard className="mr-3" /> Dashboard
        </li>
        <li className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500">
          <Person className="mr-3" /> User
        </li>
        <li className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500">
          <ShoppingCart className="mr-3" /> Product
        </li>
        <li className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500">
          <Article className="mr-3" /> Blog
        </li>
        <li className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500">
          <ExitToApp className="mr-3" /> Sign in
        </li>
        <li className="flex items-center text-gray-600 cursor-pointer hover:text-blue-500">
          <HelpOutline className="mr-3" /> Not Found
        </li>
      </ul>
      <div className="mt-auto text-center text-blue-600 cursor-pointer">
        <p>More features?</p>
        <p>From only $69</p>
      </div>
    </div>
  );
};

export default Sidebar;
