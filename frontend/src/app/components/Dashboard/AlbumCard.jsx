"use client";
import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Separator from "../Separator/Separator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { GlobalContext } from "./../../../context/GlobalContext";
import UpdateAlbum from "./UpdateAlbum";
import usePagination from "@/hooks/usePagination";
import Link from "next/link";

const AlbumCard = () => {
  const { albums, deleteAlbum } = useContext(GlobalContext);
  const { visibleCount, loadMore } = usePagination(8, 8);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [deleteAlbumId, setDeleteAlbumId] = useState(null);

  // Delete dialog handlers
  const handleDeleteOpen = (albumId) => {
    setDeleteAlbumId(albumId); // Store the album ID
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
    setDeleteAlbumId(null); // Reset the album ID
  };

  // Update dialog handlers
  const handleUpdateOpen = (album) => {
    setCurrentAlbum(album);
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
    setCurrentAlbum(null); // Reset current album
  };

  return (
    <Card className="p-4 my-10">
      <Typography gutterBottom variant="h5" component="div">
        All Albums
      </Typography>

      <Separator width="w-20" position="justify-start" />

      {/* Albums */}
      <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 lg:grid-cols-4 albums">
        {albums?.slice(0, visibleCount).map((album) => (
          <Card sx={{ maxWidth: 345 }} className="" key={album?.id}>
            <Link key={album?.id} href={`/gallery/${album?.id}`}>
              <CardMedia
                component="img"
                height="194"
                image={`${process.env.NEXT_PUBLIC_IMAGE_URL}${album?.image}`}
                alt={album?.name || "Album"}
                className="cursor-pointer h-[300px] p-2 object-cover"
              />
            </Link>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {album?.name}
              </Typography>
            </CardContent>
            <div className="flex justify-end gap-2 p-3">
              <div className="flex justify-end gap-4">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleUpdateOpen(album)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteOpen(album?.id)}
                >
                  Delete
                </Button>
              </div>

              {/* Delete Dialog */}
              <Dialog
                open={openDelete}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="album-delete">
                  {"Are you sure you want to delete this album?"}
                </DialogTitle>

                <DialogActions>
                  <Button onClick={handleDeleteClose}>Cancel</Button>
                  <Button
                    onClick={() => {
                      handleDeleteClose(); // Close the dialog
                      deleteAlbum(deleteAlbumId); // Delete the album
                    }}
                    autoFocus
                  >
                    Delete Album
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Update Dialog */}
              <Dialog
                open={openUpdate}
                onClose={handleUpdateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="album-update">Update Album</DialogTitle>
                <UpdateAlbum
                  handleUpdateClose={handleUpdateClose}
                  album={currentAlbum}
                />
              </Dialog>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {albums.length > visibleCount && (
        <div className="mt-10 text-center">
          <Button variant="contained" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </Card>
  );
};

export default AlbumCard;
