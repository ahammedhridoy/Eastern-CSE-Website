"use client";
import Image from "next/image";
import { Button, CardContent, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { formats, modules } from "../../../config/editorConfig";
// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import dynamic from "next/dynamic";

const UpdateProgram = ({ program, handleUpdateClose }) => {
  const [description, setDescription] = useState(program?.description);
  const [title, setTitle] = useState(program?.title);
  const [image, setImage] = useState(null);
  const { updateProgram } = useContext(GlobalContext);

  // Update Blog

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Create FormData to send image
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    // Call the updateSlide function with the slide ID and formData
    const success = await updateProgram(program?.id, formData);

    if (success) {
      handleUpdateClose();
    }
  };

  return (
    <div>
      <CardContent>
        {/* Form */}
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={handleUpdate}
        >
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
                label="Title"
                variant="outlined"
                className="w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <ReactQuill
              modules={modules}
              formats={formats}
              className="mt-2 mb-14 quill h-[350px]"
              theme="snow"
              onChange={(e) => setDescription(e)}
              value={description}
              placeholder="Description"
            />
            <Button variant="contained" type="submit" className="w-full mt-10">
              Update Program
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default UpdateProgram;
