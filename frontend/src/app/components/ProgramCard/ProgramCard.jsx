"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const ProgramCard = () => {
  const programs = [
    {
      id: 1,
      title: "BSc in CSE",
      description: `The Department of Computer Science & Engineering offers a four-year Bachelor of Science degree program.
The curriculum aims to provide students with a broad understanding of digital computers' theory, design, and applications. `,
      image: "/images/program/bsccse.png",
    },
  ];

  return (
    <div className="mt-10 event-card">
      <div
        className={`grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-4`}
      >
        {programs.map((program) => (
          <Link key={program.id} href={`/programs/${program.id}`}>
            <Card
              sx={{ maxWidth: 345 }}
              className="transition-all duration-300 hover:scale-110"
            >
              <CardMedia
                component="img"
                height="194"
                image={`${program?.image}`}
                alt={program.title || "Event Image"}
                className="object-cover w-full h-[300px]"
                quality={100}
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {program?.title || "Program"}
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="p"
                  className="text-[var(--black-color)] text-justify"
                >
                  {program?.description || ""}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProgramCard;
