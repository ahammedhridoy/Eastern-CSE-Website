"use client";
import React from "react";
import Card from "@mui/material/Card";
import { Button, CardContent, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import apiClient from "../../../config/axiosConfig";
import Image from "next/image";

const AddAlbum = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      console.log("Token retrieved from localStorage:", token);
      if (token) {
        setAccessToken(JSON.parse(token));
      }
    } else {
      console.log("Window object is undefined");
    }
  }, []);

  // Add Blog
  const submitAlbum = async (e) => {
    e.preventDefault();

    try {
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        return;
      }

      if (!name || !image) {
        toast.error("All fields are required");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const res = await apiClient.post("/api/v1/album/create", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.status === 201) {
        toast.success("Album added successfully");
        setName("");
        setImage("");
      } else {
        toast.error(res.data.message || "Error adding Album");
      }
    } catch (error) {
      console.error("Error adding Album:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <Card>
      <Toaster />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Add Album
        </Typography>
        {/* Form */}
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={submitAlbum}
        >
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
            <div className="w-full mt-2">
              <TextField
                id="album-name"
                label="Name"
                variant="outlined"
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <Button variant="contained" type="submit" className="w-full mt-4">
              Add Album
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddAlbum;