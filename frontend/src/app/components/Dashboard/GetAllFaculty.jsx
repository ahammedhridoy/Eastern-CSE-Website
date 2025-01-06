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
import UpdateFaculty from "./UpdateFaculty";
import Link from "next/link";

const GetAllFaculty = () => {
  const { visibleCount, loadMore } = usePagination(8, 8);
  const { deleteFaculty, faculties } = useContext(GlobalContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState(null);
  const [deleteFacultyId, setDeleteFacultyId] = useState(null);

  // Delete dialog handlers
  const handleDeleteOpen = (facultyId) => {
    setDeleteFacultyId(facultyId); // Store the faculty ID
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
    setDeleteFacultyId(null); // Reset the faculty ID
  };

  // Update dialog handlers
  const handleUpdateOpen = (faculty) => {
    setCurrentFaculty(faculty);
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
    setCurrentFaculty(null); // Reset current faculty
  };

  return (
    <div className="w-full mt-5">
      <Card className="p-4">
        <Typography gutterBottom variant="h5" component="div">
          All Faculties
        </Typography>
        <Separator position="justify-start" />
        <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 lg:grid-cols-4 faculty-card">
          {faculties.slice(0, visibleCount).map((faculty) => (
            <Card sx={{ maxWidth: 345 }} className="" key={faculty.id}>
              <Link href={`/faculty/${faculty?.id}`}>
                <Avatar
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${faculty?.image}`}
                  alt="faculty"
                  className="mx-auto mt-2 md:w-[300px] md:h-[300px] w-[200px] h-[200px]"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {faculty?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {faculty?.designation}
                  </Typography>
                </CardContent>
              </Link>

              <div className="flex justify-end gap-4 p-4">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleUpdateOpen(faculty)} // Pass the current faculty for editing
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteOpen(faculty.id)} // Pass the faculty ID for deletion
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Load More */}
      {faculties.length > visibleCount && (
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
              deleteFaculty(deleteFacultyId); // Use the stored faculty ID
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
        <DialogTitle id="faculty-update-title">Update Faculty</DialogTitle>
        <UpdateFaculty
          faculty={currentFaculty} // Pass the current faculty for updating
          handleUpdateClose={handleUpdateClose}
        />
      </Dialog>
    </div>
  );
};

export default GetAllFaculty;
