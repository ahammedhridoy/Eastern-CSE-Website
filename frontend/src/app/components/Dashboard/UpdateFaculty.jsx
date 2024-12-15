"use client";
import { Avatar, Button, CardContent, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { GlobalContext } from "./../../../context/GlobalContext";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import dynamic from "next/dynamic";

const UpdateFaculty = ({ faculty, handleUpdateClose }) => {
  const [description, setDescription] = useState(faculty?.description);
  const [name, setName] = useState(faculty?.name);
  const [designation, setDesignation] = useState(faculty?.designation);
  const [image, setImage] = useState(null);
  const { updateFaculty } = useContext(GlobalContext);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Create FormData to send image
    const formData = new FormData();
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    // Call the updateSlide function with the slide ID and formData
    const success = await updateFaculty(faculty.id, formData);

    if (success) {
      handleUpdateClose(); // Close modal only if the update is successful
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
      ["link", "image", "video"],
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
    <div>
      <CardContent>
        <Toaster />
        <form className="flex flex-col w-full" onSubmit={handleUpdate}>
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
              Update Faculty
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default UpdateFaculty;
