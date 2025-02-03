import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoLocationOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import Separator from "../Separator/Separator";

const ContactInfo = () => {
  return (
    <div className="container contact-info">
      <div className="mt-10 text-3xl font-semibold text-center text-[var(--black-color)]">
        Contact Information
      </div>
      <Separator width="w-20" position="justify-center" />
      <div className="flex flex-col items-center justify-center gap-5 mt-10 lg:flex-row">
        <Card className="w-[350px] h-[200px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IoLocationOutline className="text-3xl text-[var(--primary-color)]" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent className="ml-7">
            <p>
              Road 6, Block B, Ashulia Model Town Khagan, Birulia, Savar, Dhaka,
              Bangladesh
            </p>
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
              Phone:{" "}
              <span className="text-[var(--primary-color)] font-bold">
                +8809602666651, +8809602666652
              </span>
            </p>

            <p>
              Mail:{" "}
              <span className="text-[var(--primary-color)] font-bold">
                info@easternuni.edu.bd, registrar@easternuni.edu.bd
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
            <p>Saturday - Friday: 09:00 AM - 04:00 PM</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactInfo;
