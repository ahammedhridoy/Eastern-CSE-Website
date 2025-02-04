"use client";
import React, { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GlobalContext } from "@/context/GlobalContext";
import ContentLoading from "../ContentLoading/ContentLoading";
import NoContentFound from "../NoContentFound/NoContentFound";
import Link from "next/link";
import { CardMedia, Typography } from "@mui/material";

const ProgramCarousel = () => {
  const { programs, loading } = useContext(GlobalContext);

  if (loading) {
    return <ContentLoading height="[300px]" />;
  }

  if (programs?.length === 0) {
    return <NoContentFound mesage="No Program Found!" height={"[300px]"} />;
  }

  return (
    <div className="container px-10 mx-auto mb-10">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {programs.map((program) => (
            <CarouselItem key={program?.id} className="">
              <div className="mt-10 ">
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProgramCarousel;
