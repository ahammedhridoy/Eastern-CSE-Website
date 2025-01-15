"use client";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import { Button, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import apiClient from "../../../config/axiosConfig";
import Image from "next/image";
import { GlobalContext } from "./../../../context/GlobalContext";
import Separator from "../Separator/Separator";

const AddAboutSlider = () => {
  const [aboutImages, setAboutImages] = useState([]);
  const { accessToken, fetchAboutSliders } = useContext(GlobalContext);

  // Add Slider
  const addSlider = async (e) => {
    e.preventDefault();

    try {
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        return;
      }

      if (!aboutImages || aboutImages.length === 0) {
        toast.error("Image is required");
        return;
      }

      const formData = new FormData();

      // Append each selected image file to the FormData
      Array.from(aboutImages).forEach((image) => {
        formData.append("images", image);
      });

      const res = await apiClient.post(
        "/api/v1/about/slider/create",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res?.status === 201) {
        toast.success("Slider added successfully");
        setAboutImages([]);
        fetchAboutSliders();
      } else {
        toast.error(res.data.message || "Error adding Slider");
      }
    } catch (error) {
      console.error("Error adding Slider:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <Card className="">
      <Toaster />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Add a Slide
        </Typography>
        <Separator position="justify-start" />
        {/* Form */}
        <form encType="multipart/form-data" method="post" onSubmit={addSlider}>
          <div className="w-full">
            <div className="mt-4 file-input">
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => setAboutImages(e.target.files)}
                multiple
                variant="outlined"
              />
            </div>
            <div className="my-2">
              {aboutImages && aboutImages.length > 0 && (
                <div className="flex flex-wrap w-full gap-4 image-preview">
                  {Array.from(aboutImages).map((image, index) => (
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
              Add Slide
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddAboutSlider;
