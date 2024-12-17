"use client";
import { useContext, useState } from "react";
import {
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  Button,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { GlobalContext } from "./../../../context/GlobalContext";
import { toast, Toaster } from "react-hot-toast";
import apiClient from "./../../../config/axiosConfig";
import Separator from "../Separator/Separator";

const AddImages = () => {
  const [albumId, setAlbumId] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const { albums, accessToken, fetchAllImages } = useContext(GlobalContext);

  // Add Images
  const submitGallery = async (e) => {
    e.preventDefault();

    try {
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        return;
      }

      if (!albumId || !galleryImages || galleryImages.length === 0) {
        toast.error("All fields are required");
        return;
      }

      if (galleryImages?.length > 30) {
        return toast.error("You can't add more than 30 images at a time!");
      }

      const formData = new FormData();
      formData.append("albumId", albumId);

      // Append each selected image file to the FormData
      Array.from(galleryImages).forEach((image) => {
        formData.append("images", image); // Use the same name as in multer setup
      });

      const res = await apiClient.post("/api/v1/gallery/create", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.status === 201) {
        toast.success("Images added successfully");
        setAlbumId("");
        setGalleryImages([]);
        fetchAllImages();
      } else {
        toast.error(res.data.message || "Error adding Images");
      }
    } catch (error) {
      console.error("Error adding Images:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };
  return (
    <div>
      <Toaster />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Add Images to Album
        </Typography>
        <Separator width="w-20" position="justify-start" />
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={submitGallery}
        >
          <div className="lg:w-[40%] w-full">
            <FormControl className="w-full my-2">
              <InputLabel>Album</InputLabel>

              <Select
                className="w-full"
                required
                label="Album"
                value={albumId}
                onChange={(e) => setAlbumId(e.target.value)}
              >
                {albums?.map((album) => (
                  <MenuItem key={album?.id} value={album?.id}>
                    {album?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className="mt-4 file-input">
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => setGalleryImages(e.target.files)}
                multiple
                variant="outlined"
                className="w-full"
                required
              />
            </div>

            <div className="w-full my-2">
              {galleryImages && galleryImages.length > 0 && (
                <div className="flex flex-wrap w-full gap-4 image-preview">
                  {Array.from(galleryImages).map((image, index) => (
                    <Image
                      key={index}
                      src={URL.createObjectURL(image)}
                      width={200}
                      height={200}
                      className="flex-shrink-0 lg:w-[300px] lg:h-[200px] md:w-full md:h-[400px] w-full h-[200px] border-2 border-gray-400 border-dashed object-cover"
                    />
                  ))}
                </div>
              )}
            </div>

            <Button variant="contained" type="submit" className="w-full mt-4">
              Add Images
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default AddImages;
