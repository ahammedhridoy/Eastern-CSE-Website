"use client";
import { createContext, useState, useEffect } from "react";
import apiClient from "./../config/axiosConfig";
import { toast } from "react-hot-toast";
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(false);

  // Access Token
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setAccessToken(JSON.parse(token));
      }
    } else {
      console.log("Window object is undefined");
    }
  }, []);

  // Get All Albums
  const getAlbums = async (e) => {
    try {
      const res = await apiClient.get("/api/v1/album/all");
      if (res?.status === 200) {
        setAlbums(res?.data?.albums);
      }
    } catch (error) {
      console.error("Error getting Album:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  // Update Album
  const updateAlbum = async (albumId, name, image) => {
    try {
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("image", image);
      }

      const res = await apiClient.put(`/api/v1/album/${albumId}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.status === 200) {
        toast.success("Album updated successfully");
        getAlbums();
      } else {
        toast.error(res.data.message || "Error updating Album");
      }
    } catch (error) {
      console.error("Error updating Album:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  // Delete Album
  const deleteAlbum = async (albumId) => {
    try {
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        return;
      }

      const res = await apiClient.delete(`/api/v1/album/${albumId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res?.status === 200) {
        toast.success("Album deleted successfully");
        getAlbums();
      } else {
        toast.error(res.data.message || "Error deleting Album");
      }
    } catch (error) {
      console.error("Error deleting Album:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  // Get All Blogs
  const fetchBlogs = async (e) => {
    setLoading(true);
    try {
      const res = await apiClient.get("/api/v1/blog/all");
      if (res?.status === 200) {
        setBlogs(res?.data?.blogs);
      }
    } catch (error) {
      console.error("Error getting Album:", error);
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // Get Single Blog
  const fetchSingleBlog = async (blogId) => {
    try {
      const response = await apiClient.get(`/api/v1/blog/${blogId}`);

      if (response?.status === 200) {
        return response?.data;
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  // Delete Blog
  const deleteBlog = async (blogId, accessToken) => {
    try {
      const response = await apiClient.delete(`/api/v1/blog/${blogId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        toast.success("Blog deleted successfully");
        return true; // Indicate success
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error(error.response?.data?.message || "Server error");
      return false; // Indicate failure
    }
  };

  // Update blog
  const updateBlog = async (blogId, title, description, image) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      const response = await apiClient.put(`/api/v1/blog/${blogId}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Blog updated successfully");
        fetchBlogs();
        return true;
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error.response?.data?.message || "Server error");
      return false; // Indicate failure
    }
  };

  // Fetching
  useEffect(() => {
    getAlbums();
    fetchBlogs();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        albums,
        accessToken,
        getAlbums,
        deleteAlbum,
        updateAlbum,
        fetchBlogs,
        fetchSingleBlog,
        blogs,
        deleteBlog,
        updateBlog,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
