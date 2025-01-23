import ContactInfo from "@/app/components/ContactInfo/ContactInfo";
import React from "react";
import Map from "../components/Map/Map";

export const metadata = {
  title: "Contact",
  description: "",
};

const Contact = () => {
  return (
    <div className="contact">
      {/* Banner */}
      <div className="relative banner">
        {/* <Image
          src={"/images/contact/contact-banner.jpg"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
          alt="Banner"
        /> */}
        <div
          style={{ width: "100%", height: "300px" }}
          className="object-cover bg-[#2D3B50] "
        ></div>
        <h1 className="absolute z-10 text-3xl font-bold text-white -translate-x-1/2 -translate-y-1/2 lg:text-5xl top-1/2 left-1/2">
          Contact Us
        </h1>

        <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
      </div>
      {/* Contact Info*/}
      <ContactInfo />
      {/* Form */}
      {/* <div className="py-10 mt-10">
        <div className="container my-10">
          <ContactForm />
        </div>
      </div> */}

      {/* Map */}
      <Map />
    </div>
  );
};

export default Contact;
