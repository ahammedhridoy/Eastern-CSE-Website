import Album from "@/app/components/SingleAlbum/Album";
import React from "react";

export const metadata = {
  title: "Album",
  description: "",
};

const SingleAlbum = () => {
  return (
    <div className="single-album">
      {/* Banner */}
      <div className="relative banner">
        {/* <Image
          src={"/images/album/album.jpg"}
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
