"use client";
import React from "react";
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

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
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
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);

  return (
    <div className="forgot-form">
      <Box className="w-[300px] md:w-[750px]">
        <Card variant="outlined">
          <CardContent>
            <h1 className="my-10 text-5xl font-bold text-center text-[var(--black-color)]">
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

                <FormControl variant="outlined" className="w-full mb-5">
                  <InputLabel htmlFor="outlined-adornment-password">
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
                    id="outlined-adornment-password"
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
