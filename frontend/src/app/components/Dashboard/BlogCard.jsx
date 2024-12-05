"use client";
import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { GlobalContext } from "@/context/GlobalContext";
import usePagination from "./../../../hooks/usePagination";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";
import UpdateBlog from "./UpdateBlog";

const BlogCard = () => {
  const { blogs, loading, accessToken, deleteBlog, fetchBlogs } =
    useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null); // Track which blog to delete
  const { visibleCount, loadMore } = usePagination(8, 8);

  const handleClickOpen = (blogId) => {
    setBlogToDelete(blogId); // Set the blog ID for deletion
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBlogToDelete(null); // Reset blog ID when closing
  };

  // Delete Blog
  const handleDelete = async (blogId) => {
    const success = await deleteBlog(blogId, accessToken);
    if (success) {
      handleClose();
      fetchBlogs(); // Refresh blogs list after deletion
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
    <div>
      <Toaster />
      <div className="grid w-full grid-cols-1 gap-5 my-4 md:grid-cols-2 lg:grid-cols-4 place-content-center place-items-center">
        {loading ? (
          <LoadingSpinner />
        ) : (
          blogs?.slice(0, visibleCount).map((blog) => (
            <Card
              sx={{ maxWidth: 345 }}
              className="transition-all"
              key={blog?.id}
            >
              <CardMedia
                component="img"
                height="194"
                image={`${process.env.NEXT_PUBLIC_IMAGE_URL}${blog?.image}`}
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
                  {blog?.title}
                </Typography>
              </CardContent>
              <div className="flex justify-end gap-2 p-3">
                <EditIcon
                  className="text-green-700 cursor-pointer"
                  onClick={handleUpdateOpen}
                />
                <DeleteForeverIcon
                  className="text-red-700 cursor-pointer"
                  onClick={() => handleClickOpen(blog?.id)} // Pass blog ID here
                />
                {/*Delete Dialog */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                >
                  <DialogTitle id="blog-delete-title">
                    {"Are you sure you want to delete this blog?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      onClick={() => handleDelete(blogToDelete)}
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
                  <DialogTitle id="blog-update-title">
                    <UpdateBlog
                      blog={blog}
                      handleUpdateClose={handleUpdateClose}
                    />
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleUpdateClose}>Cancel</Button>
                  </DialogActions>
                </Dialog>
                {/*Update Dialog */}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Load More */}
      {blogs?.length > visibleCount && (
        <div className="mt-10 text-center">
          <Button variant="contained" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
