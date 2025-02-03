"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import Separator from "../Separator/Separator";
import AlbumCardHome from "../AlbumCardHome/AlbumCardHome";
const AlbumBlock = () => {
  return (
    <div className="my-10">
      <h1 className="text-3xl text-center  text-[var(--black-color)] font-bold">
        Albums
      </h1>

      <Separator width="w-20" position="justify-center" />

      {/* Albums */}

      <AlbumCardHome />
    </div>
  );
};

export default AlbumBlock;
