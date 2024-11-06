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

const ForgotPasswordForm = () => {
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

  return (
    <div className="forgot-form">
      <Box className="w-[300px] md:w-[750px]">
        <Card variant="outlined">
          <CardContent>
            <h1 className="my-10 text-5xl font-bold text-center text-[var(--black-color)]">
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
