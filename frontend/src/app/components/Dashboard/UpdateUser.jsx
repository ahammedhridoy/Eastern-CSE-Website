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

const UpdateUser = ({ user, handleUpdateClose }) => {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user?.role);
  const { updateUser, fetchUsers } = useContext(GlobalContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  // Update Album
  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(user?.id, name, email, role, password);
    handleUpdateClose();
  };

  return (
    <div>
      <CardContent>
        {/* Form */}
        <form
          component="form"
          className="flex flex-col w-full"
          onSubmit={handleUpdate}
        >
          <div className="w-full">
            <div className="w-full mt-2">
              <TextField
                id="user-update-name"
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
                id="user-update-email-address"
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
                id="user-update-password"
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
              Update User
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
};

export default UpdateUser;
