import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoLocationOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import Separator from "../Separator/Separator";

const ContactInfo = () => {
  return (
    <div className="container contact-info">
      <div className="mt-10 text-5xl font-semibold text-center text-[var(--black-color)]">
        Contact Information
      </div>
      <Separator width="w-20" position="justify-center" />
      <div className="flex flex-col items-center justify-center gap-5 mt-10 md:flex-row">
        <Card className="w-[350px] h-[200px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IoLocationOutline className="text-3xl text-[var(--primary-color)]" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent className="ml-7">
            <p>1800 Abbot Kinney Blvd. Unit D & E Venice</p>
          </CardContent>
        </Card>

        <Card className="w-[350px] h-[200px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BsTelephone className="text-3xl text-[var(--primary-color)]" />
              Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="ml-7">
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
              <IoMdTime className="text-3xl text-[var(--primary-color)]" />
              Open Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="ml-7">
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

export default ContactInfo;
