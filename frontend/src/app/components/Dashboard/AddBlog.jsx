"use client";
import React from "react";
import Card from "@mui/material/Card";
import { Avatar, Button, CardContent, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import apiClient from "../../../config/axiosConfig";
import Image from "next/image";
// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import dynamic from "next/dynamic";
import { formats, modules } from "./../../../config/editorConfig";
import { GlobalContext } from "./../../../context/GlobalContext";
import Separator from "../Separator/Separator";

const AddBlog = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const { accessToken, fetchBlogs } = useContext(GlobalContext);

  // Add Blog
  const addBlog = async (e) => {
    e.preventDefault();

    try {
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        return;
      }

      if (!title || !description || !image) {
        toast.error("All fields are required");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      const res = await apiClient.post("/api/v1/blog/create", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.status === 201) {
        toast.success("Blog added successfully");
        setTitle("");
        setDescription("");
        setImage("");
        fetchBlogs();
      } else {
        toast.error(res.data.message || "Error adding Blog");
      }
    } catch (error) {
      console.error("Error adding Blog:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <Card>
      <Toaster />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Add Blog
        </Typography>
        <Separator position="justify-start" />
        {/* Form */}
        <form encType="multipart/form-data" method="post" onSubmit={addBlog}>
          <div className="lg:w-[50%] w-full">
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
                  className="w-[500px] h-[300px] border-2 border-gray-400 border-dashed"
                />
              )}
            </div>
            <div className="w-full mt-2">
              <TextField
                id="blog-title"
                label="Title"
                variant="outlined"
                className="w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <ReactQuill
              id="blog-description"
              modules={modules}
              formats={formats}
              className="mt-2 mb-14 quill h-[350px]"
              theme="snow"
              onChange={(e) => setDescription(e)}
              value={description}
              placeholder="Description"
            />
            <Button variant="contained" type="submit" className="w-full mt-4">
              Add Blog
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddBlog;
