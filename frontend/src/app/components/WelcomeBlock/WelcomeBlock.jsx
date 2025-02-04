import React from "react";
import Separator from "../Separator/Separator";
import { Button } from "@mui/material";
import Link from "next/link";
const WelcomeBlock = () => {
  return (
    <div className="my-10 event">
      <h1 className=" text-3xl text-[var(--black-color)] font-bold text-center">
        Welcome to the Department of CSE
      </h1>
      <Separator width="w-20" position="justify-center" />
      {/* Cards */}
      <div>
        <p className="mt-5 text-lg text-[var(--black-color)] text-justify p-4">
          At Eastern University's Computer Science and Engineering (CSE)
          department, we prioritize affordability to ensure that quality
          education is accessible to all students. We offer a range of
          scholarships and financial aid opportunities designed to alleviate the
          financial burden on students and their families. Our tuition rates are
          competitive, and we strive to maintain transparency regarding costs,
          allowing students to plan effectively for their education. By
          providing various financial resources, we empower students to focus on
          their studies without the stress of overwhelming financial
          obligations, making higher education a reality for many. <br />
          The academics at Eastern University's CSE department are structured to
          provide a comprehensive educational experience that prepares students
          for the rapidly evolving tech landscape. Our curriculum encompasses a
          blend of theoretical knowledge and practical skills, ensuring that
          graduates are well-equipped for both industry demands and advanced
          studies. Students engage in a rigorous program that includes core
          courses, electives, and hands-on lab work, fostering critical thinking
          and problem-solving abilities. The academic environment encourages
          collaboration among peers and faculty, promoting a culture of
          innovation and excellence. <br />
          At Eastern University, we believe that a vibrant student life is
          integral to personal and academic growth. Our CSE department offers
          numerous opportunities for students to engage in extracurricular
          activities that complement their studies. From tech clubs and
          hackathons to networking events with industry professionals, students
          can cultivate their interests and build lasting connections.
          Additionally, our supportive campus community fosters an inclusive
          atmosphere where diversity is celebrated, allowing students to thrive
          both academically and socially. We aim to inspire our students not
          only through academics but also through enriching experiences that
          prepare them for future success.
        </p>
      </div>

      <div className="mt-10 text-center">
        <Link href="/about">
          <Button variant="contained">Read More</Button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeBlock;
