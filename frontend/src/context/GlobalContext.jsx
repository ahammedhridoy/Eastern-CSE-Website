"use client";
import { createContext, useState, useEffect } from "react";
import apiClient from "./../config/axiosConfig";
import { toast } from "react-hot-toast";
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [albums, setAlbums] = useState(null);

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

  // Fetching
  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ albums, accessToken, getAlbums, deleteAlbum, updateAlbum }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
