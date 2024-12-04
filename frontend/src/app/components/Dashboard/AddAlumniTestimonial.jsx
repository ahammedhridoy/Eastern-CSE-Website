"use client";
import React from "react";
import Card from "@mui/material/Card";
import { Avatar, Button, CardContent, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import apiClient from "../../../config/axiosConfig";
// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import dynamic from "next/dynamic";
import { GlobalContext } from "./../../../context/GlobalContext";

const AddAlumniTestimonial = () => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [image, setImage] = useState(null);
  const { accessToken } = useContext(GlobalContext);

  // Add Faculty
  const submitAlumniTestimonial = async (e) => {
    e.preventDefault();

    try {
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        return;
      }

      if (!name || !batch || !description || !image) {
        toast.error("All fields are required");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("batch", batch);
      formData.append("description", description);
      formData.append("image", image);

      const res = await apiClient.post("/api/v1/alumni/create", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.status === 201) {
        toast.success("Testimonial added successfully");
        setName("");
        setBatch("");
        setDescription("");
        setImage("");
      } else {
        toast.error(res.data.message || "Error adding Testimonial");
      }
    } catch (error) {
      console.error("Error adding Testimonial:", error);
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
          Add Alumni Testimonial
        </Typography>
        {/* Form */}
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={submitAlumniTestimonial}
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
                <Avatar
                  src={URL.createObjectURL(image)}
                  alt="Alumni"
                  className="mx-auto mt-2 md:w-[300px] md:h-[300px] w-[200px] h-[200px] object-cover border-2 border-var(--primary-color)"
                />
              )}
            </div>
            <div className="w-full mt-2">
              <TextField
                id="alumni-name"
                label="Name"
                variant="outlined"
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full mt-2">
              <TextField
                id="alumni-batch"
                label="Batch"
                variant="outlined"
                className="w-full"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
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
              Add Testimonial
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddAlumniTestimonial;
