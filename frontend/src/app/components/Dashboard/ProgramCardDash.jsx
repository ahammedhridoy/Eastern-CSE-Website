"use client";
import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { GlobalContext } from "@/context/GlobalContext";
import usePagination from "../../../hooks/usePagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import UpdateProgram from "./UpdateProgram";

const ProgramCardDash = () => {
  const { programs, loading, deleteProgram } = useContext(GlobalContext);
  const { visibleCount, loadMore } = usePagination(8, 8);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [deleteProgramId, setDeleteProgramId] = useState(null);

  // Delete dialog handlers
  const handleDeleteOpen = (programId) => {
    setDeleteProgramId(programId);
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
    setDeleteProgramId(null);
  };

  // Update dialog handlers
  const handleUpdateOpen = (program) => {
    setCurrentProgram(program);
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
    setCurrentProgram(null);
  };

  return (
    <div>
      <Toaster />

      <div className="grid w-full grid-cols-1 gap-5 my-4 md:grid-cols-2 lg:grid-cols-4 place-content-center place-items-center">
        {loading ? (
          <LoadingSpinner />
        ) : (
          programs?.slice(0, visibleCount).map((program) => (
            <div sx={{ maxWidth: 345 }}>
              <Link key={program?.id} href={`/programs/${program?.id}`}>
                <Card sx={{ maxWidth: 345 }} className="transition-all">
                  <CardMedia
                    component="img"
                    height="194"
                    image={`${process.env.NEXT_PUBLIC_IMAGE_URL}${program?.image}`}
                    alt="event"
                    className="object-cover h-[300px]"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="line-clamp-2"
                    >
                      {program?.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
              <div className="flex justify-end gap-4 p-4">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleUpdateOpen(program)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteOpen(program?.id)}
                >
                  Delete
                </Button>
                {/*Delete Dialog */}
                <Dialog
                  open={openDelete}
                  onClose={handleDeleteClose}
                  aria-labelledby="alert-dialog-title"
                >
                  <DialogTitle>
                    {"Are you sure you want to delete this program?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button
                      onClick={() => {
                        deleteProgram(deleteProgramId);
                        handleDeleteClose();
                      }}
                      color="error"
                      autoFocus
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
                {/*Delete Dialog */}
                {/*Update Dialog */}
                <Dialog
                  open={openUpdate}
                  onClose={handleUpdateClose}
                  aria-labelledby="alert-dialog-title"
                >
                  <DialogTitle>
                    <UpdateProgram
                      program={currentProgram}
                      handleUpdateClose={handleUpdateClose}
                    />
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleUpdateClose}>Cancel</Button>
                  </DialogActions>
                </Dialog>
                {/*Update Dialog */}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {programs?.length > visibleCount && (
        <div className="mt-10 text-center">
          <Button variant="contained" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProgramCardDash;
