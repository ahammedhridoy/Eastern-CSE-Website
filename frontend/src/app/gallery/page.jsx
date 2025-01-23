import React from "react";
import Separator from "@/app/components/Separator/Separator";
import AlbumCardHome from "../components/AlbumCardHome/AlbumCardHome";

export const metadata = {
  title: "Gallery",
  description: "",
};

function Gallery() {
  return (
    <div className="min-h-screen gallery">
      {/* Banner */}
      <div className="relative banner">
        {/* <Image
          src={"/images/gallery/gallery_banner.jpg"}
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
          Gallery
        </h1>
        <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
      </div>
      {/* content */}
      <div className="container my-10">
        <h1 className="text-5xl text-center text-[var(--black-color)] font-bold">
          Albums
        </h1>
        <Separator />
        {/* Albums */}
        <AlbumCardHome />
      </div>
    </div>
  );
}

export default Gallery;
