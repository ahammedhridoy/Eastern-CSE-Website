"use client";
import React, { useContext } from "react";
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
import { GlobalContext } from "../../../context/GlobalContext";
import Separator from "../Separator/Separator";
import { formats, modules } from "@/config/editorConfig";

const AddFaculty = () => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [image, setImage] = useState("");
  const { accessToken, fetchAllFaculties } = useContext(GlobalContext);

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
        fetchAllFaculties();
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
          Add Faculty
        </Typography>
        <Separator position="justify-start" />
        {/* Form */}
        <form encType="multipart/form-data" method="post" onSubmit={addFaculty}>
          <div className="w-full">
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
