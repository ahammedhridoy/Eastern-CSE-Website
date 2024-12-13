import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import AddAlbum from "./../../components/Dashboard/AddAlbum";
import AlbumCard from "./../../components/Dashboard/AlbumCard";
const AlbumDash = () => {
  return (
    <div>
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="mr-[300px] hidden lg:block">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="w-full my-4">
          <DashMobileMenu />
          <AddAlbum />
          <AlbumCard />
        </div>
      </div>
    </div>
  );
};

export default AlbumDash;
