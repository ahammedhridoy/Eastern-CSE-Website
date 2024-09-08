import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutInfoCard = () => {
  return (
    <div className="container my-10 contact-info">
      <div className="flex flex-col items-center justify-center gap-5 mt-10 md:flex-row">
        <Card className="w-[350px] h-[200px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Address</CardTitle>
          </CardHeader>
          <CardContent className="">
            <p>1800 Abbot Kinney Blvd. Unit D & E Venice</p>
          </CardContent>
        </Card>

        <Card className="w-[350px] h-[200px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Contact</CardTitle>
          </CardHeader>
          <CardContent className="">
            <p>
              Mobile:{" "}
              <span className="text-[var(--primary-color)] font-bold">
                (+88) - 1990 - 6886
              </span>
            </p>
            <p>
              Hotline:{" "}
              <span className="text-[var(--primary-color)] font-bold">
                1800 - 1102
              </span>
            </p>
            <p>
              Mail:{" "}
              <span className="text-[var(--primary-color)] font-bold">
                contact@edumall.com
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="w-[350px] h-[200px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Open Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <p>
              Monday - Friday: 09:00 - 20:00 <br />
              Sunday & Saturday: 10:30 - 22:00
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutInfoCard;
