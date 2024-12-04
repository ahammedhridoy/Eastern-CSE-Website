"use client";
import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import Separator from "../Separator/Separator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { GlobalContext } from "./../../../context/GlobalContext";
import UpdateAlbum from "./UpdateAlbum";
const AlbumCard = () => {
  const { albums, deleteAlbum } = useContext(GlobalContext);

  //Delete   Dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Update   Dialog
  const [update, setUpdate] = useState(false);

  const handleUpdateOpen = () => {
    setUpdate(true);
  };

  const handleUpdateClose = () => {
    setUpdate(false);
  };
  return (
    <Card className="p-4 my-10">
      <Typography gutterBottom variant="h5" component="div">
        All Albums
      </Typography>

      <Separator width="w-20" position="justify-start" />

      {/* Albums */}
      <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 lg:grid-cols-4 albums">
        {albums?.map((album) => (
          <Card
            sx={{ maxWidth: 345 }}
            className="transition-all duration-300 hover:scale-110"
            key={album?.id}
          >
            <CardMedia
              component="img"
              height="194"
              image={`${process.env.NEXT_PUBLIC_IMAGE_URL}${album?.image}`}
              alt="Paella dish"
              className="cursor-pointer h-[300px]"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {album?.name}
              </Typography>
            </CardContent>
            <div className="flex justify-end gap-2 p-3">
              <EditIcon
                className="text-green-700 cursor-pointer"
                onClick={handleUpdateOpen}
              />
              <DeleteForeverIcon
                className="text-red-700 cursor-pointer"
                onClick={handleClickOpen}
              />
              {/*Delete Dialog */}

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="album-delete">
                  {"Are you sure you want to delete this album?"}
                </DialogTitle>

                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    onClick={() => {
                      handleClose(); // Close the dialog or modal
                      deleteAlbum(album?.id); // Delete the album
                    }}
                    autoFocus
                  >
                    Delete Album
                  </Button>
                </DialogActions>
              </Dialog>
              {/*Delete Dialog */}
              {/*Update Dialog */}

              <Dialog
                open={update}
                onClose={handleUpdateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="album-update">
                  <UpdateAlbum
                    albumId={album?.id}
                    handleUpdateClose={handleUpdateClose}
                    album={album}
                  />
                </DialogTitle>

                <DialogActions>
                  <Button onClick={handleUpdateClose}>Cancel</Button>
                </DialogActions>
              </Dialog>
              {/*Update Dialog */}
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-10 text-center">
        <Button variant="contained">Load More</Button>
      </div>
    </Card>
  );
};

export default AlbumCard;
