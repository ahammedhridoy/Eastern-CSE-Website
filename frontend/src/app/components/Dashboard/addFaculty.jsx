"use client";
import React from "react";
import Card from "@mui/material/Card";
import { Button, CardContent, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import apiClient from "./../../../config/axiosConfig";
import Image from "next/image";

const AddFaculty = () => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [image, setImage] = useState("");
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

  // Add Faculty
  const addFaculty = async (e) => {
    e.preventDefault();

    try {
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        return;
      }

      if (!name || !designation || !description || !image) {
        toast.error("All fields are required");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("designation", designation);
      formData.append("description", description);
      formData.append("image", image);

      const res = await apiClient.post("/api/v1/faculty/create", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.status === 201) {
        toast.success("Faculty added successfully");
      } else {
        toast.error(res.data.message || "Error adding faculty");
      }
    } catch (error) {
      console.error("Error adding faculty:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <Card>
      <Toaster />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Create Faculty
        </Typography>
        {/* Form */}
        <form encType="multipart/form-data" method="post" onSubmit={addFaculty}>
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image && (
              <Image
                src={URL.createObjectURL(image)}
                alt="Faculty"
                width={200}
                height={200}
                className="my-2"
              />
            )}
          </div>
          <div className="mt-2">
            <TextField
              id="faculty-name"
              label="Name"
              variant="outlined"
              className=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <TextField
              id="faculty-designation"
              label="Designation"
              variant="outlined"
              className=""
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <TextField
              id="faculty-description"
              label="Description"
              variant="outlined"
              className=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button variant="contained" type="submit" className="mt-4">
            Add
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddFaculty;
