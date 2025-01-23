import AboutCarousel from "@/app/components/AboutCarousel/AboutCarousel";
import AboutInfoCard from "@/app/components/AboutInfoCard/AboutInfoCard";
import Separator from "@/app/components/Separator/Separator";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "About",
  description: "",
};

const About = () => {
  return (
    <div className="min-h-screen about">
      {/* Banner */}
      <div className="relative banner">
        {/* <Image
          src={"/images/about/about_banner.jpg"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
          alt="Banner"
          className="object-cover bg-[#2D3B50] opacity-0"
        /> */}
        <div
          style={{ width: "100%", height: "300px" }}
          className="object-cover bg-[#2D3B50] "
        ></div>
        <h1 className="absolute z-10 text-3xl font-bold text-white -translate-x-1/2 -translate-y-1/2 lg:text-5xl top-1/2 left-1/2">
          About Us
        </h1>
        <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
      </div>
      {/* content */}

      <div className="flex items-center justify-center px-4 py-10">
        <div className="container flex flex-col-reverse items-center justify-center gap-5 p-5 about-wrapper lg:flex-row lg:p-0">
          {/* Left */}
          <div className="about-left basis-1/2">
            <h1 className="lg:text-5xl text-3xl  text-[var(--black-color)] font-bold">
              Departmental Vision and Mission
            </h1>
            <Separator width="w-20" position="justify-start" />
            <h4 className="text-2xl font-semibold text-[--primary-color] mb-2">
              Vision of Dept. of CSE
            </h4>
            <p className="text-[var(--gray-color)] text-justify mb-4">
              The vision of Department of CSE is to build a center of excellence
              for producing quality graduates to compete in the national and the
              international arena in the field of Computer Science and
              Engineering through ensuring outcome based curriculum, necessary
              analytical skills and professional diversity.
            </p>
            <h4 className="text-2xl font-semibold text-[--primary-color] mb-2">
              Mission of Dept. of CSE
            </h4>
            <p className="text-[var(--gray-color)] text-justify mb-2">
              <span className="font-semibold">Statement-1:</span> To provide
              quality education and exposure to the latest tools and
              technologies in the area of Computer Science and Engineering.
            </p>
            <p className="text-[var(--gray-color)] text-justify mb-2">
              <span className="font-semibold">Statement-2:</span> To promote
              research based projects/activities in the emerging areas of
              Computer Science and Engineering.
            </p>
            <p className="text-[var(--gray-color)] text-justify mb-2">
              <span className="font-semibold">Statement-3:</span> To ensure
              engaging students with real life situations by collaboration with
              the industry.
            </p>
            <p className="text-[var(--gray-color)] text-justify mb-2">
              <span className="font-semibold">Statement-4:</span> To ensure a
              spirited, congenial and inclusive environment where students,
              faculty and staff can flourish together.
            </p>
          </div>
          {/* Right */}
          <div className="flex items-center justify-center about-right basis-1/2">
            {/* <img src="/images/about/about-us.webp" alt="about" /> */}
            <Image
              src="/images/about/about-us.webp"
              className="object-cover border-4 border-[#fff] rounded-2xl"
              width={500}
              height={500}
              alt="about"
            />
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <AboutInfoCard />

      {/*  */}
      <AboutCarousel />
    </div>
  );
};

export default About;
