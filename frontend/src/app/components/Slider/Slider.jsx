"use client";
import React, { useContext, useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styles from "./Slider.module.css";
import Image from "next/image";
import { GlobalContext } from "@/context/GlobalContext";
import ContentLoading from "../ContentLoading/ContentLoading";
import NoContentFound from "../NoContentFound/NoContentFound";

const Slider = () => {
  const [slide, setSlide] = useState(0);
  const { slides, loading } = useContext(GlobalContext);

  // Handle the next and previous slide functionality
  const nextSlide = () => {
    setSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Automatically change the slide every 5 seconds
  useEffect(() => {
    if (!loading && slides?.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [slides, loading]);

  // Early return for loading and no slides
  if (loading) {
    return <ContentLoading height="[400px]" />;
  }

  if (!slides || slides.length === 0) {
    return <NoContentFound mesage="No Slides Found!" height={"[400px]"} />;
  }

  return (
    <div>
      <div className={`${styles.slider} relative`}>
        <KeyboardArrowLeftIcon
          onClick={prevSlide}
          className={`${styles.arrow} ${styles.arrowLeft} z-10 text-[var(--primary-color)] text-[35px] absolute top-[50%] lg:left-[2%] left-[5%] translate-x-[-50%] translate-y-[-50%] bg-[white] rounded-full cursor-pointer hover:bg-[#dad9d9] transition-all duration-300`}
        />
        {slides.map((item, idx) => (
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.image}`}
            alt=""
            className={`${
              slide === idx ? "slide" : "slide slide-hidden"
            } object-cover w-full`}
            key={idx}
          />
        ))}
        <KeyboardArrowRightIcon
          onClick={nextSlide}
          className={`${styles.arrow} ${styles.arrowRight} z-10 text-[35px] text-[var(--primary-color)] absolute top-[50%] lg:left-[98%] left-[95%] translate-x-[-50%] translate-y-[-50%] bg-[white] rounded-full cursor-pointer hover:bg-[#dad9d9] transition-all duration-300`}
        />
        <span
          className={`absolute bottom-2rem top-[95%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
        >
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`${
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }`}
              onClick={() => setSlide(idx)}
            ></button>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Slider;
