"use client";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Separator from "../Separator/Separator";
import usePagination from "@/hooks/usePagination";
import { GlobalContext } from "@/context/GlobalContext";
import UpdateTeacherTestimonial from "./UpdateTeacherTestimonial";

const ShowTeacherTestimonials = () => {
  const { visibleCount, loadMore } = usePagination(8, 8);
  const { teacherTestimonials, deleteTeacherTestimonial } =
    useContext(GlobalContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const [deleteTestimonialId, setDeleteTestimonialId] = useState(null);

  // Delete dialog handlers
  const handleDeleteOpen = (testimonialId) => {
    setDeleteTestimonialId(testimonialId); // Store the faculty ID
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
    setDeleteTestimonialId(null); // Reset the faculty ID
  };

  // Update dialog handlers
  const handleUpdateOpen = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
    setCurrentTestimonial(null); // Reset current faculty
  };

  return (
    <div className="w-full mt-5">
      <Card className="p-4">
        <Typography gutterBottom variant="h5" component="div">
          Teacher Testimonials
        </Typography>
        <Separator position="justify-start" />
        <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 lg:grid-cols-4 faculty-card">
          {teacherTestimonials.slice(0, visibleCount).map((testimonial) => (
            <div className="relative card-wrapper max-w-[345px] mx-auto w-[345px]">
              <Avatar
                alt={testimonial?.name}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${testimonial?.image}`}
                sx={{ width: 70, height: 70 }}
                className="absolute z-20 -translate-y-1/2 left-[40%]"
              />
              <Card className="">
                <CardContent className="p-6 mt-10 text-center">
                  <h3 className="mb-1 text-lg font-semibold">
                    {testimonial?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial?.designation}
                  </p>
                </CardContent>
                <div className="flex justify-end gap-4 p-4">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleUpdateOpen(testimonial)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteOpen(testimonial?.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Card>

      {/* Load More */}
      {teacherTestimonials.length > visibleCount && (
        <div className="mt-10 text-center">
          <Button variant="contained" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}

      {/* Delete Dialog */}
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="faculty-delete-title">
          {"Are you sure you want to delete this faculty?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button
            onClick={() => {
              deleteTeacherTestimonial(deleteTestimonialId); // Use the stored faculty ID
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
        <DialogTitle id="tec-tes-update-title">Update Testimonial</DialogTitle>
        <UpdateTeacherTestimonial
          testimonial={currentTestimonial}
          handleUpdateClose={handleUpdateClose}
        />
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShowTeacherTestimonials;
