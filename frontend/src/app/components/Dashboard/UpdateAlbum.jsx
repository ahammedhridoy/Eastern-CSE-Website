"use client";
import Image from "next/image";
import { Button, CardContent, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { GlobalContext } from "./../../../context/GlobalContext";

const UpdateAlbum = ({ albumId, handleUpdateClose, album }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const { updateAlbum } = useContext(GlobalContext);
  console.log(album.image);

  // Update Album
  const handleUpdate = (e) => {
    e.preventDefault();
    updateAlbum(albumId, name, image);
    handleUpdateClose(); // Close the dialog after updating
  };

  return (
    <div>
      <CardContent>
        {/* Form */}
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={handleUpdate} // Call handleUpdate directly
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
                  className="w-[300px] h-[300px] border-2 border-gray-400 border-dashed"
                  alt="Selected image preview" // Added alt text for accessibility
                />
              )}
            </div>
            <div className="w-full mt-2">
              <TextField
                id="update-album-name"
                label="Name"
                variant="outlined"
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <Button variant="contained" type="submit" className="w-full mt-4">
              Update Album
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default UpdateAlbum;
