"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
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

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const onSubmit = async (userData) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/api/v1/auth/register", userData);
      console.log(response);
      if (response?.status === 200) {
        toast.success("User registered successfully!");
        reset();
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster />
      <CardContent>
        <h1 className="my-4 text-3xl font-semibold">Create New Account</h1>

        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1 } }}
          className="flex flex-col max-h-fit max-w-[345px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name Input */}
          <FormControl variant="outlined" className="w-full mb-5">
            <InputLabel>Name</InputLabel>
            <OutlinedInput
              className="bg-[var(--input-bg-color)]"
              type="text"
              label="Name"
              {...register("name", { required: true, maxLength: 40 })}
            />
            {errors.name && <p className="text-red-500">Name is required</p>}
          </FormControl>

          {/* Email Input */}
          <FormControl variant="outlined" className="w-full mb-5">
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              className="bg-[var(--input-bg-color)]"
              type="email"
              label="Email"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </FormControl>

          {/* Password Input */}
          <FormControl variant="outlined" className="w-full mb-5">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              className="bg-[var(--input-bg-color)]"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true, minLength: 6 })}
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
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
          </FormControl>

          {/* Role Selector */}
          <FormControl className="w-full mb-5">
            <InputLabel>Role</InputLabel>
            <Select
              className="bg-[var(--input-bg-color)]"
              {...register("role", { required: true })}
            >
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="EDITOR">EDITOR</MenuItem>
            </Select>
            {errors.role && <p className="text-red-500">Role is required</p>}
          </FormControl>

          {/* Submit Button */}
          <Button
            disabled={isLoading}
            type="submit"
            variant="contained"
            className="w-full"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </CardContent>
    </div>
  );
};

export default CreateAccount;
