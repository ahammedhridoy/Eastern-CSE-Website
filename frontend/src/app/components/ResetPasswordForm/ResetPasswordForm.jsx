"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import toast, { Toaster } from "react-hot-toast";
import apiClient from "@/config/axiosConfig";
import { useParams } from "next/navigation";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const { token } = useParams();

  // Submit form
  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await apiClient.post("/api/v1/auth/reset-password", {
        token,
        newPassword: data.password,
      });

      if (res?.status === 200) {
        toast.success("Password updated successfully");
        setTimeout(() => router.push("/admin"), 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
      console.error("Error resetting password:", error.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  return (
    <div className="forgot-form">
      <Toaster />
      <Box className="w-full md:w-[750px] p-2">
        <Card variant="outlined">
          <CardContent>
            <h1 className="my-10 lg:text-5xl text-3xl font-bold text-center text-[var(--black-color)]">
              Reset Password
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
                {/* New Password Input */}
                <FormControl variant="outlined" className="w-full mb-5">
                  <InputLabel htmlFor="outlined-adornment-password">
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    {...register("password", {
                      required: true,
                      maxLength: 40,
                      minLength: 6,
                    })}
                    required
                    className="bg-[var(--input-bg-color)]"
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-500" role="alert">
                      Password is required
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-500" role="alert">
                      Max length exceeded
                    </p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500" role="alert">
                      Min length not reached
                    </p>
                  )}
                </FormControl>

                {/* Confirm Password Input */}
                <FormControl variant="outlined" className="w-full mb-5">
                  <InputLabel htmlFor="outlined-adornment-confirm-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    {...register("confirmPassword", {
                      required: true,
                      maxLength: 40,
                      minLength: 6,
                    })}
                    required
                    className="bg-[var(--input-bg-color)]"
                    id="outlined-adornment-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                  {errors.confirmPassword?.type === "required" && (
                    <p className="text-red-500" role="alert">
                      Confirm Password is required
                    </p>
                  )}
                  {errors.confirmPassword?.type === "maxLength" && (
                    <p className="text-red-500" role="alert">
                      Max length exceeded
                    </p>
                  )}
                  {errors.confirmPassword?.type === "minLength" && (
                    <p className="text-red-500" role="alert">
                      Min length not reached
                    </p>
                  )}
                </FormControl>

                {/* Submit Button */}
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  className="w-full"
                >
                  {isSubmitting ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ResetPasswordForm;
