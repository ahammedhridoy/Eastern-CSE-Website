import ContactForm from "@/app/components/ContactForm/ContactForm";
import ContactInfo from "@/app/components/ContactInfo/ContactInfo";
import Separator from "@/app/components/Separator/Separator";
import Image from "next/image";
import React from "react";

const Contact = () => {
  return (
    <div className="contact">
      {/* Banner */}
      <div className="relative banner">
        <Image
          src={"/images/contact/contact-banner.jpg"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
          alt="Banner"
        />
        <h1 className="absolute z-10 text-3xl text-white -translate-x-1/2 -translate-y-1/2 md:text-5xl top-1/2 left-1/2">
          Contact Us
        </h1>

        <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
      </div>
      {/* Contact Info*/}
      <ContactInfo />
      {/* Form */}
      <div className="py-10 mt-10">
        <div className="container my-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
