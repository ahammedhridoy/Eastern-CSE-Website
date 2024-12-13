"use client";
import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import apiClient from "./../../../config/axiosConfig";
import { GlobalContext } from "@/context/GlobalContext";

const LoginForm = () => {
  const { setCurrentUser } = useContext(GlobalContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  // Submit form
  const onSubmit = async (data) => {
    setLoginError("");
    try {
      const response = await apiClient.post("/api/v1/auth/login", data, {
        withCredentials: true,
      });

      if (response?.status === 200) {
        const token = response?.data?.accessToken;
        const user = response?.data?.user;
        setCurrentUser(user);
        localStorage.setItem("accessToken", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));

        toast.success(response.data.message);
        window.location.href = "/";
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      setLoginError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-form">
      <Toaster />
      <Box className="w-[300px] md:w-[600px]">
        <Card variant="outlined">
          <CardContent>
            <h1 className="my-10 text-5xl font-bold text-center text-[var(--black-color)]">
              Login
            </h1>

            {loginError && (
              <p className="mb-5 text-center text-red-500">{loginError}</p>
            )}

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
              <div className="">
                <FormControl variant="outlined" className="w-full mb-5">
                  <InputLabel htmlFor="outlined-adornment-email">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    className="bg-[var(--input-bg-color)]"
                    id="outlined-adornment-email"
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

                <FormControl variant="outlined" className="w-full mb-5">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
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
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
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

                <p className="mb-5 text-[var(--primary-color)]">
                  <Link
                    className="hover:border-b-2 w-fit hover:text-[var(--yellow-color)]"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </p>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  className="w-full"
                >
                  {isSubmitting ? "Loading..." : "Login"}
                </Button>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default LoginForm;
