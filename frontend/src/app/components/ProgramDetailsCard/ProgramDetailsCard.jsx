"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ProgramDetailsCard = () => {
  const program = {
    id: 1,
    title: "BSc in CSE",
    description: `The Department of Computer Science & Engineering offers a four-year Bachelor of Science degree program.
The curriculum aims to provide students with a broad understanding of digital computers' theory, design, and applications. `,
    image: "/images/program/bsccse.png",
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/files/CSE.pdf";
    link.download = "CSE.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="">
      <Card>
        <CardMedia
          image={`/images/program/bsccse.png`}
          title={program?.title || ""}
          className="object-cover h-[300px] md:h-[200px]"
          alt={program?.title || ""}
          quality={100}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="lg:text-3xl text-3xl  text-[var(--black-color)] font-bold"
          >
            B.Sc. in CSE (Computer Science and Engineering)
          </Typography>

          <Typography
            gutterBottom
            variant="h4"
            component="div"
            className="text-2xl font-semibold text-[--primary-color] mb-2"
          >
            Objectives of the Program Offering Entity
          </Typography>

          <Typography
            variant="p"
            className="text-justify text-[var(--gray-color)]"
          >
            To produce skilled graduates who can pursue their career and make a
            contribution to the society by their professional skill.
          </Typography>

          {/* ********** */}
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            className="text-2xl font-semibold text-[--primary-color] mt-4"
          >
            Name of the Degree
          </Typography>

          <Typography
            variant="p"
            className="text-justify text-[var(--gray-color)]"
          >
            B. Sc. in Computer Science and Engineering (B. Sc. in CSE)
          </Typography>

          {/* ********** */}
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            className="text-2xl font-semibold text-[--primary-color] mt-4"
          >
            Description of the Program
          </Typography>

          <Typography
            variant="p"
            className="text-justify text-[var(--gray-color)]"
          >
            The Department of Computer Science and Engineering offers program
            leading to the degree of B.Sc. in Computer Science and Engineering
            (CSE). According to the UGC guideline the curricula has been
            designed and prepared to make the program more goal-oriented to
            fulfill the needs of the age. This review has been performed mainly
            for converting the syllabus from trimester to semester system.
            Furthermore some new important and updated courses have been added
            to make the foundation of the participants stronger with diversified
            knowledge.
          </Typography>

          {/* ********** */}
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            className="text-2xl font-semibold text-[--primary-color] mt-4"
          >
            Admission Requirements
          </Typography>

          <Typography
            variant="p"
            className="text-justify text-[var(--gray-color)]"
          >
            • Minimum GPA 2.50 each at SSC and HSC /Diploma (If GPA is below
            2.50 then minimum GPA 2.00 and total GPA 6.00 is required) <br />•
            ‘O’-level in 5(five) subjects and ‘A’ level in 2 (two) major
            subjects with minimum ‘B’ grade or GPA 4.00 in four subjects and ‘C’
            grade or GPA 3.50 in three subjects. <br /> • The applicants must
            have science background in both SSC and HSC (or in equivalent
            level). <br />• The applicants must have Mathematics in HSC (or in
            equivalent level).
          </Typography>

          {/* ********** */}
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            className="text-2xl font-semibold text-[--primary-color] mt-4"
          >
            Duration of the program
          </Typography>

          <Typography
            variant="p"
            className="text-justify text-[var(--gray-color)]"
          >
            • The duration for B. Sc. in Computer Science and Engineering
            program is four years divided into 8 semesters <br />• Total minimum
            credit requirement to complete the program : 155 <br />• Total class
            weeks in a semester : 14 <br />• Download Semester Wise Course
            Distribution
          </Typography>

          {/* ********** */}
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            onClick={handleDownload}
            className="text-2xl font-semibold text-[--primary-color] hover:underline cursor-pointer mt-4"
          >
            Download Semester Wise Course Distribution
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramDetailsCard;
