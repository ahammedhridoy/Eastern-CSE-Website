import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiGraduationCapLine } from "react-icons/ri";
import { IoBookSharp } from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi2";

const AboutInfoCard = () => {
  return (
    <div className="container px-4 my-10 contact-info">
      <div className="flex flex-col items-center justify-center gap-5 mt-10 md:flex-row">
        <Card className="w-[350px] ">
          <CardHeader className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <RiGraduationCapLine className="text-7xl text-[var(--primary-color)] " />
            </div>
            <CardTitle className="flex items-center gap-2 mt-4 text-center">
              Affordability
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>
              At Eastern University's Computer Science and Engineering (CSE)
              department, we prioritize affordability to ensure that quality
              education is accessible to all students. We offer a range of
              scholarships and financial aid opportunities designed to alleviate
              the financial burden on students and their families. Our tuition
              rates are competitive, and we strive to maintain transparency
              regarding costs, allowing students to plan effectively for their
              education. By providing various financial resources, we empower
              students to focus on their studies without the stress of
              overwhelming financial obligations, making higher education a
              reality for many.
            </p>
          </CardContent>
        </Card>

        <Card className="w-[350px] ">
          <CardHeader className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <IoBookSharp className="text-7xl text-[var(--primary-color)] " />
            </div>
            <CardTitle className="flex items-center gap-2">Academics</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>
              The academics at Eastern University's CSE department are
              structured to provide a comprehensive educational experience that
              prepares students for the rapidly evolving tech landscape. Our
              curriculum encompasses a blend of theoretical knowledge and
              practical skills, ensuring that graduates are well-equipped for
              both industry demands and advanced studies. Students engage in a
              rigorous program that includes core courses, electives, and
              hands-on lab work, fostering critical thinking and problem-solving
              abilities. The academic environment encourages collaboration among
              peers and faculty, promoting a culture of innovation and
              excellence.
            </p>
          </CardContent>
        </Card>

        <Card className="w-[350px] ">
          <CardHeader className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <HiOutlineLightBulb className="text-7xl text-[var(--primary-color)] " />
            </div>
            <CardTitle className="flex items-center gap-2 mt-5">
              Inspiring Student Life
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>
              At Eastern University, we believe that a vibrant student life is
              integral to personal and academic growth. Our CSE department
              offers numerous opportunities for students to engage in
              extracurricular activities that complement their studies. From
              tech clubs and hackathons to networking events with industry
              professionals, students can cultivate their interests and build
              lasting connections. Additionally, our supportive campus community
              fosters an inclusive atmosphere where diversity is celebrated,
              allowing students to thrive both academically and socially. We aim
              to inspire our students not only through academics but also
              through enriching experiences that prepare them for future
              success.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutInfoCard;
