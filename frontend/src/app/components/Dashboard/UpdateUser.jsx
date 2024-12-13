"use client";
import {
  Button,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { GlobalContext } from "./../../../context/GlobalContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import toast, { Toaster } from "react-hot-toast";

const UpdateUser = ({ user, handleUpdateClose }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user?.role || "");
  const { updateUser } = useContext(GlobalContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  // Update User
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user?.id) {
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
      password, // Optional, only included if provided
    };

    const success = await updateUser(user.id, payload);

    if (success) {
      handleUpdateClose();
    }
  };

  return (
    <div>
      <Toaster />
      <CardContent>
        <form className="flex flex-col w-full" onSubmit={handleUpdate}>
          <TextField
            label="Name"
            variant="outlined"
            className="w-full mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            className="w-full mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <FormControl variant="outlined" className="w-full my-2">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <FormControl className="w-full my-2">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="EDITOR">EDITOR</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" className="w-full">
            Update User
          </Button>
        </form>
      </CardContent>
    </div>
  );
};

export default UpdateUser;
