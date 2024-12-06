"use client";
import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import { GlobalContext } from "@/context/GlobalContext";
import UpdateSlide from "./UpdateSlide";
import usePagination from "@/hooks/usePagination";
import Separator from "../Separator/Separator";

const ShowAllSlider = () => {
  const { slides, fetchSliders, deleteSlide } = useContext(GlobalContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [deleteSlideId, setDeleteSlideId] = useState(null); // Track the ID of the slide to delete
  const { visibleCount, loadMore } = usePagination(8, 8);

  // Delete dialog handlers
  const handleDeleteOpen = (slideId) => {
    setDeleteSlideId(slideId); // Store the slide ID
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
    setDeleteSlideId(null); // Reset the slide ID
  };

  // Update dialog handlers
  const handleUpdateOpen = (slide) => {
    setCurrentSlide(slide);
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
    setCurrentSlide(null); // Reset current slide
  };

  return (
    <div className="w-full my-4">
      <Card className="p-4">
        <Typography gutterBottom variant="h5" component="div">
          All Slides
        </Typography>
        <Separator position="justify-start" />
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 place-content-center place-items-center">
          {slides.map((slide) => (
            <Card sx={{ maxWidth: 345 }} key={slide.id}>
              <CardMedia
                component="img"
                height="194"
                image={`${process.env.NEXT_PUBLIC_IMAGE_URL}${slide?.image}`}
                alt="Slide image"
                className="object-cover w-[400px] h-[300px]"
              />
              <div className="flex justify-between gap-4 p-4">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleUpdateOpen(slide)} // Pass the current slide for editing
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteOpen(slide.id)} // Pass the slide ID for deletion
                >
                  Delete
                </Button>
              </div>

              {/* Delete Dialog */}
              <Dialog
                open={openDelete}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
              >
                <DialogTitle id="slider-delete-title">
                  {"Are you sure you want to delete this slide?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleDeleteClose}>Cancel</Button>
                  <Button
                    onClick={() => {
                      deleteSlide(deleteSlideId); // Use the stored slide ID
                      handleDeleteClose();
                    }}
                    color="error"
                    autoFocus
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Update Dialog */}
              <Dialog
                open={openUpdate}
                onClose={handleUpdateClose}
                aria-labelledby="alert-dialog-title"
              >
                <DialogTitle id="slider-update-title">Update Slide</DialogTitle>
                <UpdateSlide
                  slide={currentSlide} // Pass the current slide for updating
                  handleUpdateClose={handleUpdateClose}
                />
              </Dialog>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {slides.length > visibleCount && (
          <div className="mt-10 text-center">
            <Button variant="contained" onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShowAllSlider;
