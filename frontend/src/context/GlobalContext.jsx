"use client";
import { createContext, useState, useEffect } from "react";
import apiClient from "./../config/axiosConfig";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [singleBlog, setSingleBlog] = useState(null);
  const [users, setUsers] = useState([]);
  const [slides, setSlides] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [singleFaculty, setSingleFaculty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teacherTestimonials, setTeacherTestimonials] = useState([]);
  const [alumniTestimonials, setAlumniTestimonials] = useState([]);
  const [user, setUser] = useState(null);
  const [aboutSlides, setAboutSlides] = useState([]);
  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setLoading(true);

    const accessTokenFromCookie = Cookies.get("accessToken");
    const userFromCookie = Cookies.get("user");

    if (accessTokenFromCookie) {
      setAccessToken(accessTokenFromCookie);
    }

    if (userFromCookie) {
      setUser(JSON.parse(userFromCookie));
    }

    setLoading(false);
  }, []);

  // Fetch Single User
  const fetchSingleUser = async () => {
    setLoading(true);
    if (!user || !user.id) {
      console.error("User or user.id is undefined");
      return;
    }

    try {
      const response = await apiClient.get(`/api/v1/auth/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response?.status === 200) {
        setCurrentUser(response.data.user);
      } else {
        console.error("Failed to fetch user:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get All Albums
  const getAlbums = async (e) => {
    setLoading(true);
    try {
      const res = await apiClient.get("/api/v1/album/all");
      if (res?.status === 200) {
        setAlbums(res?.data?.albums);
      }
    } catch (error) {
      console.error("Error getting Album:", error);
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // Update Album
  const updateAlbum = async (albumId, formData) => {
    try {
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        return;
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
        fetchAllImages();
      } else {
        toast.error(res.data.message || "Error deleting Album");
      }
    } catch (error) {
      console.error("Error deleting Album:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  // Fetch Images From Album
  const fetchImages = async (albumId) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`api/v1/gallery/${albumId}`);

      if (response?.status === 200) {
        setImages(response?.data?.images);
      }
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch All Images From Album
  const fetchAllImages = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`api/v1/gallery/all`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response?.status === 200) {
        setAllImages(response?.data?.images);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Image From Gallery
  const deleteImage = async (imageId) => {
    try {
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        return;
      }

      const res = await apiClient.delete(`/api/v1/gallery/${imageId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res?.status === 200) {
        toast.success("Image deleted successfully");
        fetchAllImages();
      } else {
        toast.error(res.data.message || "Error deleting image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
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
    setLoading(true);
    try {
      const response = await apiClient.get(`/api/v1/blog/${blogId}`);

      if (response?.status === 200) {
        setSingleBlog(response?.data?.blog);
        return response?.data;
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
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
  const updateBlog = async (blogId, formData) => {
    try {
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
      return false;
    }
  };

  // Fetch All users
  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/api/v1/auth/user/all", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setUsers(response?.data?.users);
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching users");
      return [];
    }
  };

  // Update User
  const updateUser = async (userId, payload) => {
    try {
      const response = await apiClient.patch(
        `/api/v1/auth/user/update/${userId}`,
        payload, // Send JSON payload directly
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("User updated successfully");
        fetchSingleUser();
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
        fetchUsers();
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
      const response = await apiClient.get("/api/v1/slider/all");

      if (response.status === 200) {
        setSlides(response?.data?.slides);
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
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

  // Fetch All Slides
  const fetchAboutSliders = async () => {
    try {
      const response = await apiClient.get("/api/v1/about/slider/all");

      if (response.status === 200) {
        setAboutSlides(response?.data?.slides);
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
      return [];
    }
  };

  // Update a slide
  const updateAboutSlide = async (slideId, formData) => {
    try {
      if (!formData.has("image")) {
        toast.error("Image is required");
        return false;
      }

      const response = await apiClient.put(
        `/api/v1/about/slider/update/${slideId}`,
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
        fetchAboutSliders();
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
  const deleteAboutSlide = async (slideId) => {
    try {
      const response = await apiClient.delete(
        `/api/v1/about/slider/delete/${slideId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Slide deleted successfully");
        fetchAboutSliders();
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
    setLoading(true);
    try {
      const response = await apiClient.get("/api/v1/faculty/all");

      if (response?.status === 200) {
        setFaculties(response?.data?.faculties);
        return response?.data;
      }
    } catch (error) {
      console.error("Error fetching faculties:", error.response?.data?.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get Single Faculty
  const fetchSingleFaculty = async (facultyId) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/api/v1/faculty/${facultyId}`);

      if (response?.status === 200) {
        setSingleFaculty(response?.data?.faculty);
      }

      return response?.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
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
      throw error;
    }
  };

  // Fetch Teacher Testimonials
  const fetchTeacherTestimonials = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/api/v1/teacher/all");

      if (response?.status === 200) {
        setTeacherTestimonials(response?.data?.teachers);
        return response?.data;
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update Teacher Testimonial
  const updateTeacherTestimonial = async (teacherId, formData) => {
    try {
      const response = await apiClient.patch(
        `/api/v1/teacher/${teacherId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Testimonial updated successfully");
        fetchTeacherTestimonials();
      }

      return response.data.teacher; // Return updated teacher object
    } catch (error) {
      throw error;
    }
  };

  // Delete Teacher Testimonial
  const deleteTeacherTestimonial = async (teacherId) => {
    try {
      const response = await apiClient.delete(`/api/v1/teacher/${teacherId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Replace with your token retrieval logic
        },
      });

      if (response?.status === 200) {
        toast.success("Teacher deleted successfully");
        fetchTeacherTestimonials(); // Refresh the teacher list
      }

      return response.data.message; // Return success message
    } catch (error) {
      throw error;
    }
  };

  // Fetch All Alumni
  const fetchAlumniTestimonials = async () => {
    try {
      const response = await apiClient.get("/api/v1/alumni/all");

      if (response?.status === 200) {
        setAlumniTestimonials(response?.data?.alumni);
        return response?.data;
      }
    } catch (error) {
      throw error;
    }
  };

  // Update Alumni Testimonial
  const updateAlumniTestimonial = async (alumniId, formData) => {
    try {
      const response = await apiClient.patch(
        `/api/v1/alumni/${alumniId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.status === 200) {
        toast.success("Alumni updated successfully");
        fetchAlumniTestimonials();
      }

      return response?.data?.alumni;
    } catch (error) {
      throw error;
    }
  };

  // Delete Alumni Testimonial
  const deleteAlumniTestimonial = async (alumniId) => {
    try {
      const response = await apiClient.delete(`/api/v1/alumni/${alumniId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        toast.success("Alumni deleted successfully");
        fetchAlumniTestimonials(); // Refresh the alumni list
      }

      return response.data.message; // Return success message
    } catch (error) {
      throw error;
    }
  };

  // Update User Account
  const updateUserAccount = async (userId, payload) => {
    try {
      const response = await apiClient.patch(
        `/api/v1/auth/user/update/${userId}`,
        payload,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        fetchSingleUser();
        return true;
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
      return false;
    }
  };

  // Logout
  const userLogout = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post(`/api/v1/auth/logout`, {
        withCredentials: true,
      });

      console.log(response);

      if (response?.status === 200) {
        toast.success("Logged out successfully");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        Cookies.remove("accessToken");
        Cookies.remove("user");
        Cookies.remove("accessTokenExp");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during logout");
    } finally {
      setLoading(false);
    }
  };

  // Fetching
  useEffect(() => {
    getAlbums();
    fetchBlogs();
    fetchUsers();
    fetchSliders();
    fetchAllFaculties();
    fetchTeacherTestimonials();
    fetchAlumniTestimonials();
    fetchAboutSliders();
    fetchAllImages();
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
        singleBlog,
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
        singleFaculty,
        fetchSingleFaculty,
        updateFaculty,
        deleteFaculty,
        fetchTeacherTestimonials,
        updateTeacherTestimonial,
        deleteTeacherTestimonial,
        teacherTestimonials,
        fetchAlumniTestimonials,
        alumniTestimonials,
        deleteAlumniTestimonial,
        updateAlumniTestimonial,
        fetchSingleUser,
        setUser,
        user,
        setCurrentUser,
        updateUserAccount,
        fetchAboutSliders,
        aboutSlides,
        deleteAboutSlide,
        updateAboutSlide,
        fetchImages,
        images,
        fetchAllImages,
        allImages,
        deleteImage,
        currentUser,
        userLogout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
