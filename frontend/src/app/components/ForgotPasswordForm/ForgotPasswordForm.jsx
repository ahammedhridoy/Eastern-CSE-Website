"use client";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation"; // Import useRouter
import apiClient from "@/config/axiosConfig";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(true);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset, // Hook to reset the form
  } = useForm();

  const router = useRouter(); // Initialize Next.js router

  // Submit form
  const onSubmit = async (data) => {
    try {
      if (!data?.email) {
        toast.error("Email is required");
        return;
      }

      const res = await apiClient.post("/api/v1/auth/forgot-password", data);

      if (res?.status === 200) {
        toast.success("Password reset email sent");

        // Clear the email field
        reset();

        setTimeout(() => router.push("/admin"), 500);
      }
    } catch (error) {
      toast.error("Failed to send password reset email");
      console.error(error.message);
    }
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      window.location.href = "/";
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="forgot-form">
      <Toaster />
      <Box className="md:w-[750px] w-full p-2">
        <Card variant="outlined">
          <CardContent>
            <h1 className="my-10 lg:text-5xl text-3xl font-bold text-center text-[var(--black-color)]">
              Send Reset Password Email
            </h1>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
              className="flex flex-col items-center justify-center max-h-fit"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full">
                <FormControl variant="outlined" className="w-full mb-5">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    className="bg-[var(--input-bg-color)]"
                    id="forgot-password"
                    type="email"
                    label="Email"
                    required
                    {...register("email", {
                      required: true,
                      maxLength: 40,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-500" role="alert">
                      Email is required
                    </p>
                  )}
                  {errors.email?.type === "maxLength" && (
                    <p className="text-red-500" role="alert">
                      Max length exceeded
                    </p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p className="text-red-500" role="alert">
                      Invalid email
                    </p>
                  )}
                </FormControl>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ForgotPasswordForm;
