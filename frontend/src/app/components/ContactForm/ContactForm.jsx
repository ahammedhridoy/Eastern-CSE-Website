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
import { TextareaAutosize } from "@mui/material";
import Separator from "../Separator/Separator";

const ContactForm = () => {
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
    <div className="container flex items-center justify-center contact-form bg-[var(--gray-bg)]">
      {/* Title */}
      <Box className="w-[300px] md:w-full">
        <Card variant="outlined">
          <CardContent>
            <h1 className="my-10 text-5xl  text-center font-semibold text-[var(--black-color)]">
              Send Us a Message
            </h1>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
              className="flex flex-col items-center justify-center max-h-fit "
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl variant="outlined" className="w-full mb-5">
                <InputLabel htmlFor="outlined-adornment-password">
                  Name
                </InputLabel>
                <OutlinedInput
                  className="bg-[var(--input-bg-color)] w-full"
                  id="outlined-adornment-password"
                  type="text"
                  label="Name"
                  required
                  {...register("text", {
                    required: true,
                    maxLength: 40,
                  })}
                />
                {errors.text?.type === "required" && (
                  <p className="text-red-500" role="alert">
                    Name is required
                  </p>
                )}
                {errors.text?.type === "maxLength" && (
                  <p className="text-red-500" role="alert">
                    Max length exceeded
                  </p>
                )}
              </FormControl>

              <FormControl variant="outlined" className="w-full mb-5">
                <InputLabel htmlFor="outlined-adornment-password">
                  Email
                </InputLabel>
                <OutlinedInput
                  className="bg-[var(--input-bg-color)] w-full"
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
                  Subject
                </InputLabel>
                <OutlinedInput
                  className="bg-[var(--input-bg-color)] w-full"
                  type="text"
                  label="Subject"
                  required
                  {...register("text", {
                    required: true,
                    maxLength: 200,
                  })}
                />
                {errors.text?.type === "required" && (
                  <p className="text-red-500" role="alert">
                    Subject is required
                  </p>
                )}
                {errors.text?.type === "maxLength" && (
                  <p className="text-red-500" role="alert">
                    Max length exceeded
                  </p>
                )}
              </FormControl>

              <FormControl variant="outlined" className="w-full mb-5">
                <TextareaAutosize
                  variant="outlined"
                  minRows={10}
                  className="bg-[var(--input-bg-color)] w-full  rounded-sm p-4"
                  type="text"
                  placeholder="Type your message here"
                  required
                  {...register("text", {
                    required: true,
                    minLength: 20,
                  })}
                />
                {errors.text?.type === "required" && (
                  <p className="text-red-500" role="alert">
                    Message is required
                  </p>
                )}
                {errors.text?.type === "minLength" && (
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
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ContactForm;
