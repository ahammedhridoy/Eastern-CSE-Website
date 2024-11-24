"use client";
import React from "react";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import SubscriptionsTwoToneIcon from "@mui/icons-material/SubscriptionsTwoTone";
import Link from "next/link";

function Footer() {
  return (
    <div className="footer-wrap bg-[var(--primary-color)] min-h-[300px] flex  items-center justify-center relative z-50">
      <div className="flex flex-col items-center justify-center gap-5 p-5 footer lg:px-0">
        {/* Social Media */}
        <div className="flex gap-5">
          <FacebookTwoToneIcon className="text-white text-30px hover:text-[var(--yellow-color)] cursor-pointer hover:animate-bounce" />
          <SubscriptionsTwoToneIcon className="text-white text-30px hover:text-[var(--yellow-color)] cursor-pointer hover:animate-bounce" />
        </div>

        {/* Links */}
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
        </div>

        {/* Copyright */}
        <div>
          <p className="font-bold text-white">
            Copyright © 2024 Eastern CSE. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
