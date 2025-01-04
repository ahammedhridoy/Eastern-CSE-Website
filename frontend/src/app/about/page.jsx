"use client";
import AboutCarousel from "@/app/components/AboutCarousel/AboutCarousel";
import AboutInfoCard from "@/app/components/AboutInfoCard/AboutInfoCard";
import Separator from "@/app/components/Separator/Separator";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen about">
      {/* Banner */}
      <div className="relative banner">
        <Image
          src={"/images/contact/contact-banner.jpg"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
          alt="Banner"
        />
        <h1 className="absolute z-10 text-3xl text-white -translate-x-1/2 -translate-y-1/2 lg:text-5xl top-1/2 left-1/2">
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
              Who we are
            </h1>
            <Separator width="w-20" position="justify-start" />
            <p className="text-[var(--gray-color)] text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              debitis. Maxime quidem soluta repudiandae obcaecati quibusdam
              minus dignissimos beatae delectus tenetur, non in officia.
              Corrupti magni iure quia! Cum, perspiciatis! Magnam voluptatibus,
              eaque iure nobis ut doloribus qui labore dolor cumque a itaque
              nemo culpa unde delectus nam corporis dolorem voluptatem nihil
              dolorum maiores dicta ipsum. Quia molestias commodi pariatur
              officiis, beatae ducimus magnam dolore. Minima ducimus iure
              cupiditate sint aspernatur. Deserunt nesciunt provident
              praesentium est expedita asperiores fugiat, ducimus, id doloribus
              perspiciatis excepturi. Minima earum quos voluptates fugit cumque
              temporibus sit. Est accusamus accusantium illo quibusdam,
              explicabo maxime perspiciatis quisquam consequatur quidem ab amet
              eum doloremque provident tenetur reiciendis nesciunt reprehenderit
              voluptatibus! Magnam ad nemo neque voluptates voluptatem, error
              minima unde voluptas in dolore, recusandae eligendi. Maxime
              cupiditate quae impedit placeat eius atque totam vero quam quo,
              dolore sit error ab officiis.
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
