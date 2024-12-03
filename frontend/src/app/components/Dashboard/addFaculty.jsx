"use client";
import React from "react";
import Card from "@mui/material/Card";
import { Avatar, Button, CardContent, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import apiClient from "../../../config/axiosConfig";
// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import dynamic from "next/dynamic";

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
        setName("");
        setDesignation("");
        setDescription("");
        setImage("");
      } else {
        toast.error(res.data.message || "Error adding faculty");
      }
    } catch (error) {
      console.error("Error adding faculty:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  // Editor

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <Card>
      <Toaster />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Add Faculty
        </Typography>
        {/* Form */}
        <form encType="multipart/form-data" method="post" onSubmit={addFaculty}>
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
                <Avatar
                  src={URL.createObjectURL(image)}
                  alt="faculty"
                  className="mx-auto mt-2 md:w-[300px] md:h-[300px] w-[200px] h-[200px] object-cover border-2 border-var(--primary-color)"
                />
              )}
            </div>
            <div className="w-full mt-2">
              <TextField
                id="faculty-name"
                label="Name"
                variant="outlined"
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full mt-2">
              <TextField
                id="faculty-designation"
                label="Designation"
                variant="outlined"
                className="w-full"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>

            <ReactQuill
              id="faculty-description"
              modules={modules}
              formats={formats}
              className="mt-2 mb-14 quill h-[200px]"
              theme="snow"
              onChange={(e) => setDescription(e)}
              value={description}
              placeholder="Description"
            />
            <Button variant="contained" type="submit" className="w-full mt-4">
              Add Faculty
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddFaculty;
