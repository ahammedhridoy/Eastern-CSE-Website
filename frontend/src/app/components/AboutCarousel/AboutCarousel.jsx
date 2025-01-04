"use client";
import Image from "next/image";
import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Separator from "../Separator/Separator";
import { GlobalContext } from "@/context/GlobalContext";
import ContentLoading from "../ContentLoading/ContentLoading";
import NoContentFound from "../NoContentFound/NoContentFound";

const AboutCarousel = () => {
  const { aboutSlides, loading } = useContext(GlobalContext);

  if (loading) {
    return <ContentLoading height="[300px]" />;
  }

  // if (aboutSlides?.length === 0) {
  //   return <NoContentFound mesage="No Slide Found!" height={"[300px]"} />;
  // }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="container my-20">
      <div>
        <h1 className="lg:text-5xl text-3xl text-center text-[var(--black-color)] font-semibold">
          Visiting CSE Department
        </h1>
        <Separator />
      </div>
      <div className="px-5 lg:px-0">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          infinite={true}
          autoPlaySpeed={5000}
          className="mt-10"
        >
          {aboutSlides?.map((slide) => (
            <div
              className="flex flex-col items-center justify-center gap-5 px-5"
              key={slide?.id}
            >
              <div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${slide?.image}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                  alt="Banner"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default AboutCarousel;
