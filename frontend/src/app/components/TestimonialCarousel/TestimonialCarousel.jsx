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
import { Avatar } from "@mui/material";
import { GlobalContext } from "@/context/GlobalContext";
import ContentLoading from "../ContentLoading/ContentLoading";
import DOMPurify from "dompurify";

const TestimonialCarousel = () => {
  const { teacherTestimonials, loading } = useContext(GlobalContext);

  if (loading || teacherTestimonials?.length === 0) {
    return <ContentLoading height="[300px]" />;
  }

  const sanitizedContent = (content) => DOMPurify.sanitize(content || "");

  return (
    <div className="container mx-auto mb-10 w-[90%]">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {teacherTestimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial?.id}
              className="md:basis-1/2 lg:basis-1/3"
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
                      <p className="text-sm text-muted-foreground">
                        {testimonial?.designation}
                      </p>
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

export default TestimonialCarousel;
