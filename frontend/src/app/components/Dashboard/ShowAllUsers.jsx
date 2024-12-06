"use client";
import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Separator from "../Separator/Separator";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import { GlobalContext } from "@/context/GlobalContext";
import UpdateUser from "./UpdateUser";
import usePagination from "@/hooks/usePagination";

const ShowAllUsers = () => {
  const { users, deleteUser, fetchUsers } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const { visibleCount, loadMore } = usePagination(10, 10);

  //   Delete Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Delete User
  const handleDelete = async (userId) => {
    const success = await deleteUser(userId);
    if (success) {
      handleClose();
      fetchUsers();
    }
  };

  //Update   Dialog

  const handleUpdateOpen = () => {
    setUpdate(true);
  };

  const handleUpdateClose = () => {
    setUpdate(false);
  };

  return (
    <div className="w-full p-4">
      <Typography gutterBottom variant="h5" component="div">
        All Users
      </Typography>
      <Separator position="justify-start" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(0, visibleCount).map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.role}</TableCell>
                <TableCell align="right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleUpdateOpen}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleClickOpen}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
                {/*Delete Dialog */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                >
                  <DialogTitle id="user-delete-title">
                    {"Are you sure you want to delete this user?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      onClick={() => handleDelete(user?.id)}
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
                  open={update}
                  onClose={handleUpdateClose}
                  aria-labelledby="alert-dialog-title"
                >
                  <DialogTitle id="user-update-title">
                    <UpdateUser
                      user={user}
                      handleUpdateClose={handleUpdateClose}
                    />
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleUpdateClose}>Cancel</Button>
                  </DialogActions>
                </Dialog>
                {/*Update Dialog */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Load More */}
      {users?.length > visibleCount && (
        <div className="mt-10 text-center">
          <Button variant="contained" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShowAllUsers;
