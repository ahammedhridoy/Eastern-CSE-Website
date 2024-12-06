"use client";
import { createContext, useState, useEffect } from "react";
import apiClient from "./../config/axiosConfig";
import { toast } from "react-hot-toast";
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [slides, setSlides] = useState([]);
  const [faculties, setFaculties] = useState([]);
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

  // Fetch All users
  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/api/v1/auth/user/all", {
        withCredentials: true, // Include credentials if needed
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add your access token if required
        },
      });

      if (response.status === 200) {
        setUsers(response?.data?.users);
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || "Server error");
      return []; // Return an empty array on error
    }
  };

  // Update User
  const updateUser = async (userId, name, email, role, password) => {
    try {
      if (!userId || !name || !email || !role) {
        toast.error("All fields are required");
      }
      const response = await apiClient.patch(
        `/api/v1/auth/user/update/${userId}`,
        {
          name,
          email,
          role,
          password,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("User updated successfully");
        fetchUsers();
        return true;
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Server error");
      return false;
    }
  };

  // Delete User
  const deleteUser = async (userId) => {
    try {
      const response = await apiClient.delete(
        `/api/v1/auth/user/delete/${userId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("User deleted successfully");
        return true;
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "Server error");
      return false;
    }
  };

  // Fetch All Slides
  const fetchSliders = async () => {
    try {
      const response = await apiClient.get("/api/v1/slider/all", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setSlides(response?.data?.slides);
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
      toast.error(error.response?.data?.message || "Server error");
      return [];
    }
  };

  // Update a slide
  const updateSlide = async (slideId, formData) => {
    try {
      if (!formData.has("image")) {
        toast.error("Image is required");
        return false;
      }

      const response = await apiClient.put(
        `/api/v1/slider/update/${slideId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        }
      );

      if (response.status === 200) {
        toast.success("Slide updated successfully");
        fetchSliders();
        return true;
      } else {
        toast.error("Failed to update slide");
        return false;
      }
    } catch (error) {
      console.error("Error updating slide:", error);
      toast.error(error.response?.data?.message || "Server error");
      return false;
    }
  };

  // Delete a Slide
  const deleteSlide = async (slideId) => {
    try {
      const response = await apiClient.delete(
        `/api/v1/slider/delete/${slideId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Slide deleted successfully");
        fetchSliders();
        return true;
      }
    } catch (error) {
      console.error("Error deleting slide:", error);
      toast.error(error.response?.data?.message || "Server error");
      return false;
    }
  };

  // Fetch All Faculties
  const fetchAllFaculties = async () => {
    try {
      const response = await apiClient.get("/api/v1/faculty/all");

      if (response?.status === 200) {
        setFaculties(response?.data?.faculties);
        return response?.data;
      }
    } catch (error) {
      console.error("Error fetching faculties:", error.response?.data?.message);
      throw error;
    }
  };

  // Get Single Faculty
  const fetchSingleFaculty = async (facultyId) => {
    try {
      const response = await apiClient.get(`/api/v1/faculty/${facultyId}`);
      return response?.data;
    } catch (error) {
      console.error("Error fetching faculty:", error.response?.data?.message);
      throw error;
    }
  };

  // Update Faculty
  const updateFaculty = async (facultyId, formData) => {
    try {
      const response = await apiClient.patch(
        `/api/v1/faculty/${facultyId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Faculty updated successfully");
        fetchAllFaculties();
      }

      return response.data.faculty; // Return updated faculty object
    } catch (error) {
      console.error("Error updating faculty:", error.response?.data?.message);
      throw error;
    }
  };

  // Delete Faculty
  const deleteFaculty = async (facultyId) => {
    try {
      const response = await apiClient.delete(`/api/v1/faculty/${facultyId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        toast.success("Faculty deleted successfully");
        fetchAllFaculties();
      }
      return response.data.message;
    } catch (error) {
      console.error("Error deleting faculty:", error.response?.data?.message);
      throw error;
    }
  };

  // Fetching
  useEffect(() => {
    getAlbums();
    fetchBlogs();
    fetchUsers();
    fetchSliders();
    fetchAllFaculties();
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
        fetchUsers,
        users,
        deleteUser,
        updateUser,
        fetchSliders,
        slides,
        deleteSlide,
        updateSlide,
        fetchAllFaculties,
        faculties,
        fetchSingleFaculty,
        updateFaculty,
        deleteFaculty,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
