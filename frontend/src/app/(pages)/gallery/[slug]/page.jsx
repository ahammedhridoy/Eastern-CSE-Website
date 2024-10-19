import Album from "@/app/components/SingleAlbum/Album";
import Image from "next/image";
import React from "react";

const SingleAlbum = () => {
  return (
    <div className="single-album">
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
          Album
        </h1>
        <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
      </div>

      {/* content */}
      <Album />
    </div>
  );
};

export default SingleAlbum;