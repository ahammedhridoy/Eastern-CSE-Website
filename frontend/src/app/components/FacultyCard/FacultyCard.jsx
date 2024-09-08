"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Avatar } from "@mui/material";

const FacultyCard = () => {
  return (
    <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 lg:grid-cols-4 faculty-card">
      <Link href={"/faculty/single"}>
        <Card
          sx={{ maxWidth: 345 }}
          className="transition-all duration-300 hover:scale-110"
        >
          <Avatar
            src="/images/faculty/f1.jpg"
            alt="faculty"
            className="mx-auto mt-2 md:w-[300px] md:h-[300px] w-[200px] h-[200px]"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Muhammad Mahfuz Hasan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Associate Professor and Chairperson
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <Link href={"/faculty/single"}>
        <Card
          sx={{ maxWidth: 345 }}
          className="transition-all duration-300 hover:scale-110"
        >
          <Avatar
            src="/images/faculty/f1.jpg"
            alt="faculty"
            className="mx-auto mt-2 md:w-[300px] md:h-[300px] w-[200px] h-[200px]"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Muhammad Mahfuz Hasan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Associate Professor and Chairperson
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <Link href={"/faculty/single"}>
        <Card
          sx={{ maxWidth: 345 }}
          className="transition-all duration-300 hover:scale-110"
        >
          <Avatar
            src="/images/faculty/f1.jpg"
            alt="faculty"
            className="mx-auto mt-2 md:w-[300px] md:h-[300px] w-[200px] h-[200px]"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Muhammad Mahfuz Hasan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Associate Professor and Chairperson
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <Link href={"/faculty/single"}>
        <Card
          sx={{ maxWidth: 345 }}
          className="transition-all duration-300 hover:scale-110"
        >
          <Avatar
            src="/images/faculty/f1.jpg"
            alt="faculty"
            className="mx-auto mt-2 md:w-[300px] md:h-[300px] w-[200px] h-[200px]"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Muhammad Mahfuz Hasan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Associate Professor and Chairperson
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <Link href={"/faculty/single"}>
        <Card
          sx={{ maxWidth: 345 }}
          className="transition-all duration-300 hover:scale-110"
        >
          <Avatar
            src="/images/faculty/f1.jpg"
            alt="faculty"
            className="mx-auto mt-2 md:w-[300px] md:h-[300px] w-[200px] h-[200px]"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Muhammad Mahfuz Hasan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Associate Professor and Chairperson
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <Link href={"/faculty/single"}>
        <Card
          sx={{ maxWidth: 345 }}
          className="transition-all duration-300 hover:scale-110"
        >
          <Avatar
            src="/images/faculty/f1.jpg"
            alt="faculty"
            className="mx-auto mt-2 md:w-[300px] md:h-[300px] w-[200px] h-[200px]"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Muhammad Mahfuz Hasan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Associate Professor and Chairperson
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default FacultyCard;
