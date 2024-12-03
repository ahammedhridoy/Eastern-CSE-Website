"use client";
import React from "react";
import Card from "@mui/material/Card";
import { Avatar, Button, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import apiClient from "../../../config/axiosConfig";
import Image from "next/image";
// Dynamically import ReactQuill with SSR disabled

const AddSlider = () => {
  const [image, setImage] = useState("");
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setAccessToken(JSON.parse(token));
      }
    } else {
      toast.error("Access token not found");
    }
  }, []);

  // Add Slider
  const addSlider = async (e) => {
    e.preventDefault();

    try {
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        return;
      }

      if (!image) {
        toast.error("Image is required");
        return;
      }

      const formData = new FormData();
      formData.append("image", image);

      const res = await apiClient.post("/api/v1/slider/create", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.status === 201) {
        toast.success("Slider added successfully");
        setImage("");
      } else {
        toast.error(res.data.message || "Error adding Slider");
      }
    } catch (error) {
      console.error("Error adding Slider:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <Card className="min-h-screen">
      <Toaster />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Add Slider
        </Typography>
        {/* Form */}
        <form encType="multipart/form-data" method="post" onSubmit={addSlider}>
          <div className="lg:w-[40%] w-full">
            <div className="mt-4 file-input">
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                variant="outlined"
              />
            </div>
            <div className="my-2">
              {image && (
                <Image
                  src={URL.createObjectURL(image)}
                  width={200}
                  height={200}
                  className="w-full h-full border-2 border-gray-400 border-dashed"
                />
              )}
            </div>

            <Button variant="contained" type="submit" className="w-full mt-4">
              Add Slider
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSlider;
