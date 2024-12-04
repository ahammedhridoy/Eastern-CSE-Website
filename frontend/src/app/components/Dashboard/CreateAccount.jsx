"use client";
import React, { useContext, useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import toast, { Toaster } from "react-hot-toast";
import apiClient from "./../../../config/axiosConfig"; // Ensure axiosConfig is properly set up
import { TextField } from "@mui/material";
import { GlobalContext } from "./../../../context/GlobalContext";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { accessToken } = useContext(GlobalContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  // Add User
  const addUser = async (e) => {
    e.preventDefault();
    console.log("Add User:", name, email, password, role);
    setIsLoading(true);
    try {
      if (!accessToken) {
        toast.error("Access token is missing. Please log in again.");
        return;
      }

      if (!name || !email || !password || !role) {
        toast.error("All fields are required");
        return;
      }

      const data = {
        name,
        email,
        password,
        role,
      };

      const res = await apiClient.post("/api/v1/auth/register", data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (res?.status === 201) {
        toast.success("User added successfully");
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
      } else {
        toast.error(res.data.message || "Error adding User");
      }
    } catch (error) {
      console.error("Error adding User:", error);
      console.error("Error Response:", error.response); // Improved error logging
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster />
      <CardContent>
        <h1 className="my-4 text-3xl font-semibold">Add New Account</h1>

        <form
          component="form"
          className="flex flex-col w-full"
          onSubmit={addUser}
        >
          <div className="lg:w-[40%] w-full">
            <div className="w-full mt-2">
              <TextField
                id="user-name"
                label="Name"
                variant="outlined"
                className="w-full bg-[var(--input-bg-color)]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="w-full mt-2">
              <TextField
                id="user-email-address"
                label="Email"
                variant="outlined"
                className="w-full bg-[var(--input-bg-color)]"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Password Input */}
            <FormControl variant="outlined" className="w-full my-2">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                id="user-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[var(--input-bg-color)] w-full"
                type={showPassword ? "text" : "password"}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            {/* Role Selector */}
            <FormControl className="w-full my-2">
              <InputLabel>Role</InputLabel>
              <Select
                className="bg-[var(--input-bg-color)] w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="EDITOR">EDITOR</MenuItem>
              </Select>
            </FormControl>

            {/* Submit Button */}
            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              className="w-full"
            >
              {isLoading ? "Adding..." : "Add User"}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default CreateAccount;
