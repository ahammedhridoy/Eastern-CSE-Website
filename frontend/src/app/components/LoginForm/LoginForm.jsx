"use client";
import React from "react";
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

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  // Submit form
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 500));
    console.log(data);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-form">
      <Box className="w-[300px] md:w-[600px]">
        <Card variant="outlined">
          <CardContent>
            <h1 className="my-10 text-5xl font-bold text-center text-[var(--black-color)]">
              Login
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
              <div className="">
                <FormControl variant="outlined" className="w-full mb-5">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    className="bg-[var(--input-bg-color)]"
                    id="outlined-adornment-password"
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
