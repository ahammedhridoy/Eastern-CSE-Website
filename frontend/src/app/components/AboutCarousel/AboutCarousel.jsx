import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Separator from "../Separator/Separator";

const AboutCarousel = () => {
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
        <h1 className="text-5xl text-center text-[var(--black-color)] font-semibold">
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
          <div>
            <Image
              src={"/images/contact/contact-banner.jpg"}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
              alt="Banner"
            />
          </div>
          <div>
            <Image
              src={"/images/contact/contact-banner.jpg"}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
              alt="Banner"
            />
          </div>
          <div>
            <Image
              src={"/images/contact/contact-banner.jpg"}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
              alt="Banner"
            />
          </div>
          <div>
            <Image
              src={"/images/contact/contact-banner.jpg"}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
              alt="Banner"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default AboutCarousel;
