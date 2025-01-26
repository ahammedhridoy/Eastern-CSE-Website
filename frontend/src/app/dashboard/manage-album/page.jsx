import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import AddAlbum from "./../../components/Dashboard/AddAlbum";
import AlbumCard from "./../../components/Dashboard/AlbumCard";
import GalleryImages from "@/app/components/Dashboard/GalleryImages";
import ProtectedRoute from "@/app/components/ProtectedRoute";
const AlbumDash = () => {
  return (
    <ProtectedRoute requiredRoles={["EDITOR", "ADMIN"]}>
      <div>
        <div className="flex gap-4">
          {/* Main Content */}
          <div className="w-full my-4">
            <AddAlbum />
            <AlbumCard />
            <GalleryImages />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AlbumDash;
