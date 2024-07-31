"use client";
import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styles from "./Slider.module.css";
import Image from "next/image";
import { data } from "./sliderData";

const Slider = () => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="">
      <div className={`${styles.slider} relative`}>
        <KeyboardArrowLeftIcon
          onClick={prevSlide}
          className={`${styles.arrow} ${styles.arrowLeft} z-10 text-[var(--primary-color)] text-[35px] absolute top-[50%] lg:left-[2%] left-[5%] translate-x-[-50%] translate-y-[-50%] bg-[white] rounded-full cursor-pointer hover:bg-[#dad9d9] transition-all duration-300`}
        />
        {data.map((item, idx) => {
          return (
            <Image
              src={item.src}
              alt={item.alt}
              key={idx}
              className={`${slide === idx ? "slide" : "slide slide-hidden"} `}
              width={500}
              height={500}
            />
          );
        })}
        <KeyboardArrowRightIcon
          onClick={nextSlide}
          className={`${styles.arrow} ${styles.arrowRight} z-10 text-[35px] text-[var(--primary-color)] absolute top-[50%] lg:left-[98%] left-[95%] translate-x-[-50%] translate-y-[-50%] bg-[white] rounded-full cursor-pointer hover:bg-[#dad9d9] transition-all duration-300`}
        />
        <span
          className={`absolute bottom-2rem top-[95%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
        >
          {data.map((_, idx) => {
            return (
              <button
                key={idx}
                className={`${
                  slide === idx ? "indicator" : "indicator indicator-inactive"
                } `}
                onClick={() => setSlide(idx)}
              ></button>
            );
          })}
        </span>
      </div>
    </div>
  );
};

export default Slider;
