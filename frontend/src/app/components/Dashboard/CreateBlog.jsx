"use client";
import React from "react";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import apiClient from "./../../../config/axiosConfig";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  // create post
  const createPost = async (e) => {
    e.preventDefault();
    try {
      if (!title || !category || !description || !thumbnail) {
        toast.error("All fields are required");
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);

      const res = await apiClient.post("/api/v1/auth/login", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.data?.newPost) {
        setTitle("");
        setThumbnail("");
        setDescription("");
        toast.success("Post created successfully");
      }
      if (res?.status !== 200) {
        toast.error("Error creating post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full my-4">
      <Toaster />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Create Blog
        </Typography>
        {/* Form */}
        <form encType="multipart/form-data" method="post" onSubmit={createPost}>
          <div className="my-4">
            <TextField
              id="blog-title"
              label="Title"
              variant="outlined"
              className="my-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateBlog;
