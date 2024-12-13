"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { GlobalContext } from "@/context/GlobalContext";
import ProtectedRoute from "./../../../../../backend/utils/ProtectedRoute";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import toast, { Toaster } from "react-hot-toast";

const ShowAccount = () => {
  const { user, fetchSingleUser, updateUserAccount } =
    useContext(GlobalContext);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user?.role || "");
  console.log(password);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  useEffect(() => {
    if (user && user?.id) {
      fetchSingleUser();
    }
  }, []);

  // Update User
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      console.error("User ID is missing");
      return;
    }

    // Validate input fields
    if (password && password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    // Create the payload to send as JSON
    const payload = {
      name,
      email,
      role,
      ...(password && { password }), // Include password only if provided
    };

    const success = await updateUserAccount(user?.id, payload); // Use the correct function
    if (success) {
      toast.success("User updated successfully!");
      setPassword("");
    }
  };

  return (
    // <ProtectedRoute requiredRole="EDITOR">
    <div className="flex items-center justify-center mt-4">
      <Toaster />
      <Card className="w-96">
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="text-center"
          >
            {user?.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-center"
          >
            {user?.role}
          </Typography>
          <form
            component="form"
            className="flex flex-col w-full"
            onSubmit={handleUpdate}
          >
            <div className="w-full">
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
              <Button type="submit" variant="contained" className="w-full">
                Update Account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    // </ProtectedRoute>
  );
};

export default ShowAccount;
