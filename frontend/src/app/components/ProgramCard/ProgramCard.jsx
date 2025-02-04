"use client";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { GlobalContext } from "@/context/GlobalContext";
import ContentLoading from "../ContentLoading/ContentLoading";
import NoContentFound from "../NoContentFound/NoContentFound";

const ProgramCard = ({ grid }) => {
  const { programs, loading } = useContext(GlobalContext);

  if (loading) {
    return <ContentLoading height="[300px]" />;
  }

  if (programs?.length === 0) {
    return <NoContentFound mesage="No Program Found!" height={"[300px]"} />;
  }

  return (
    <div className="mt-10 event-card">
      <div className={`grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:${grid}`}>
        {programs.map((program) => (
          <Link key={program.id} href={`/programs/${program.id}`}>
            <Card
              sx={{ maxWidth: 345 }}
              className="transition-all duration-300 hover:scale-110"
            >
              <CardMedia
                component="img"
                height="194"
                image={`${process.env.NEXT_PUBLIC_IMAGE_URL}${program?.image}`}
                alt={program.title || "program Image"}
                className="object-cover w-full h-[300px]"
                quality={100}
              />

              <CardContent>
                <Typography
                  className="mt-4 line-clamp-3"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {program?.title || "Program"}
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
