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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur,
              nemo eius! Voluptas inventore harum amet officia, natus quisquam
              deserunt ad ut facilis voluptates perspiciatis aliquam atque
              quibusdam corporis nemo ipsum?
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              laudantium accusantium cumque illum alias esse doloremque dolore
              nam velit eligendi, harum, porro accusamus odio, explicabo
              molestiae nobis saepe non eaque?
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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum eius
              labore magnam odit debitis architecto, laudantium beatae sit
              voluptate numquam quaerat nihil quod illo libero maxime earum
              incidunt blanditiis! Cum.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutInfoCard;
