"use client";
import React from "react";
import Separator from "../Separator/Separator";
import ProgramCarousel from "../ProgramCarousel/ProgramCarousel";
import AdmissionDetails from "../AdmissionDetails/AdmissionDetails";
import { Button, CardContent, Typography } from "@mui/material";
import Link from "next/link";
const ProgramBlock = () => {
  return (
    <div className="w-full my-10">
      <h1 className=" text-3xl text-[var(--black-color)] font-bold text-center">
        Our Programs
      </h1>
      <Separator width="w-20" position="justify-center" />
      {/* Content */}
      <div className="flex gap-[5%] lg:flex-row flex-col">
        {/* Left */}
        <div className="lg:w-[30%] w-[100%]">
          <ProgramCarousel />
        </div>
        {/* Right */}
        <div className="lg:w-[65%] w-[100%]">
          <div className="">
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className=" text-3xl text-[var(--black-color)] font-bold"
              >
                Admission Informations
              </Typography>

              <Typography
                gutterBottom
                variant="h4"
                component="div"
                className="text-2xl font-semibold text-[--primary-color] mb-2"
              >
                Admission Schedule
              </Typography>

              <Typography
                variant="p"
                className="text-justify text-[var(--gray-color)]"
              >
                Eastern University admits students every semester. Admission
                schedule of the semester showing deadlines for admission form
                submission, admission test, admission fee payment, registration,
                withdrawal, class commencement etc. is available on the website
                of the University. The admission schedule may also be known from
                the Admission Office and from frequent admission announcements
                published by the University in the leading newspapers. The
                students seeking admission should visit Website of Eastern
                University or contact the Admission Office for admission form
                and further information.
              </Typography>

              {/* ********** */}
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                className="text-2xl font-semibold text-[--primary-color] mt-4"
              >
                Admission Test:
              </Typography>

              <Typography
                variant="p"
                className="text-justify text-[var(--gray-color)]"
              >
                Due to Covid 19 pandemic circumstances no admission test is
                required. Candidate will get admission through online as per
                instruction mentioned below.
              </Typography>

              {/* ********** */}
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                className="text-2xl font-semibold text-[--primary-color] mt-4"
              >
                How to apply for admission?
              </Typography>

              <Typography
                variant="p"
                className="text-justify text-[var(--gray-color)]"
              >
                Students seeking admission can collect Admission Form from
                admission office paying Tk.500 OR download it from the website
                following the link given bellow and can submit the same either
                online or directly to admission office.
              </Typography>

              <div className="mt-10">
                <Link href="/admission">
                  <Button variant="contained">Click to See Details</Button>
                </Link>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramBlock;
