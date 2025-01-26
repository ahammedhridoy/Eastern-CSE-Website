"use client";
import React from "react";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";

function Footer() {
  return (
    <div className="footer-wrap bg-gray-800 min-h-[100px] flex  items-center justify-center relative ">
      <div className="flex flex-col items-center justify-center gap-5 p-5 footer lg:px-0">
        {/* Social Media */}
        <div className="flex gap-5">
          <Link
            href={"https://www.facebook.com/easterncse/"}
            target="_blank"
            className="p-2 bg-[var(--primary-color)] rounded-full"
          >
            <FacebookTwoToneIcon className="text-white cursor-pointer text-30px hover:animate-bounce" />
          </Link>

          <Link
            href={"https://www.facebook.com/easterncse/"}
            target="_blank"
            className="p-2 bg-[var(--primary-color)] rounded-full"
          >
            <YouTubeIcon className="text-white cursor-pointer text-30px hover:animate-bounce" />
          </Link>

          <Link
            href={"https://www.facebook.com/easterncse/"}
            target="_blank"
            className="p-2 bg-[var(--primary-color)] rounded-full"
          >
            <InstagramIcon className="text-white cursor-pointer text-30px hover:animate-bounce" />
          </Link>
          <Link
            href={"https://www.facebook.com/easterncse/"}
            target="_blank"
            className="p-2 bg-[var(--primary-color)] rounded-full"
          >
            <LinkedInIcon className="text-white cursor-pointer text-30px hover:animate-bounce" />
          </Link>
        </div>

        {/* Links
        <div className="flex flex-col items-center justify-center gap-5 lg:flex-row">
          <Link
            href={"/"}
            className="text-white hover:text-[var(--yellow-color)]"
          >
            HOME
          </Link>
          <Link
            href={"/events"}
            className="text-white hover:text-[var(--yellow-color)]"
          >
            EVENTS
          </Link>
          <Link
            href={"/faculty"}
            className="text-white hover:text-[var(--yellow-color)]"
          >
            FACULTY
          </Link>
          <Link
            href={"/gallery"}
            className="text-white hover:text-[var(--yellow-color)]"
          >
            GALLERY
          </Link>
          <Link
            href={"/about"}
            className="text-white hover:text-[var(--yellow-color)]"
          >
            ABOUT
          </Link>
          <Link
            href={"/contact"}
            className="text-white hover:text-[var(--yellow-color)]"
          >
            CONTACT
          </Link>
        </div> */}

        {/* Copyright */}
        <div>
          <p className="font-bold text-white">
            Copyright © 2025
            {new Date().getFullYear() > 2025
              ? `-${new Date().getFullYear()}`
              : ""}{" "}
            Eastern CSE Department. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
