"use client";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import Image from "next/image";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";

const GalleryCard = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  const { deleteImage } = useContext(GlobalContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteImage(item?.id);
    handleClose();
  };

  return (
    <Card
      sx={{ maxWidth: 345 }}
      className="transition-all duration-300 hover:scale-105"
    >
      <Image
        width={500}
        height={500}
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.image}`}
        alt={item?.album}
        loading="lazy"
        style={{ objectFit: "cover" }}
        className="object-cover border-2 border-white rounded-sm cursor-pointer"
      />

      {/* Delete Icon */}
      <DeleteForeverIcon
        className="absolute p-1 text-3xl text-red-500 bg-white rounded-full cursor-pointer top-2 right-2"
        onClick={handleClickOpen}
      />

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default GalleryCard;
