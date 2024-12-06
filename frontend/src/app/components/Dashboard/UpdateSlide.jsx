"use client";
import { Button, CardContent } from "@mui/material";
import React, { useContext, useState } from "react";
import { GlobalContext } from "./../../../context/GlobalContext";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const UpdateSlide = ({ slide, handleUpdateClose }) => {
  const [image, setImage] = useState(null);
  const { updateSlide } = useContext(GlobalContext);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image to upload.");
      return;
    }

    // Create FormData to send image
    const formData = new FormData();
    formData.append("image", image);

    // Call the updateSlide function with the slide ID and formData
    const success = await updateSlide(slide.id, formData);

    if (success) {
      handleUpdateClose(); // Close modal only if the update is successful
    }
  };

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
                onChange={(e) => setImage(e.target.files[0])} // Update state with the selected file
              />
            </div>
            <div className="my-2">
              {image && (
                <Image
                  src={URL.createObjectURL(image)}
                  width={200}
                  height={200}
                  alt="Preview"
                  className="w-full h-[400px] border-2 border-gray-400 border-dashed"
                />
              )}
            </div>
            <Button type="submit" variant="contained" className="w-full">
              Update Slide
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default UpdateSlide;
