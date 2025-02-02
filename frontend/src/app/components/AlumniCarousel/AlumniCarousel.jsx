"use client";
import React, { useContext, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar } from "@mui/material";
import { GlobalContext } from "@/context/GlobalContext";
import ContentLoading from "../ContentLoading/ContentLoading";
import DOMPurify from "dompurify";
import NoContentFound from "../NoContentFound/NoContentFound";

const AlumniCarousel = () => {
  const { alumniTestimonials, loading } = useContext(GlobalContext);

  if (loading) {
    return <ContentLoading height="[300px]" />;
  }

  if (alumniTestimonials?.length === 0) {
    return <NoContentFound mesage="No Testimonial Found!" height={"[300px]"} />;
  }

  const sanitizedContent = (content) => DOMPurify.sanitize(content || "");

  return (
    <div className="container px-10 mx-auto mb-10">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {alumniTestimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial?.id}
              className="md:basis-2/2 lg:basis-1/4"
            >
              <div className="p-1 py-10">
                <div className="relative card-wrapper max-w-[345px] mx-auto">
                  <Avatar
                    alt={testimonial?.name}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${testimonial?.image}`}
                    sx={{ width: 70, height: 70 }}
                    className="absolute z-20 -translate-y-1/2 left-[40%]"
                  />
                  <Card className="transition-all duration-300 rounded-2xl hover:scale-110">
                    <CardContent className="p-6 mt-10 text-center">
                      <div
                        className="mb-5 text-sm text-muted-foreground blog-description"
                        dangerouslySetInnerHTML={{
                          __html: sanitizedContent(testimonial?.description),
                        }}
                      ></div>
                      <h3 className="mb-1 text-lg font-semibold">
                        {testimonial?.name}
                      </h3>
                      <p className=" text-semibold">
                        {testimonial?.designation}
                      </p>
                      {/* <p className="text-sm text-muted-foreground">
                        {testimonial?.batch}
                      </p> */}
                    </CardContent>
                  </Card>
                </div>
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

export default AlumniCarousel;
