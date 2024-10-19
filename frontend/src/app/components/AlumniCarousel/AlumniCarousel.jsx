import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar } from "@mui/material";

const AlumniCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Mahfuz Hasan",
      role: "Software Engineer",
      avatar: "/images/testimonial/avatar-modified.png",
      content:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    },
    {
      id: 2,
      name: "Jane Doe",
      role: "UX Designer",
      avatar: "/images/testimonial/avatar-modified.png",
      content:
        "The user experience is not just about making things look pretty, it's about making things work intuitively and efficiently.",
    },
    {
      id: 3,
      name: "John Smith",
      role: "Product Manager",
      avatar: "/images/testimonial/avatar-modified.png",
      content:
        "Building great products is all about understanding user needs and delivering solutions that exceed expectations.",
    },
    {
      id: 4,
      name: "John Smith",
      role: "Product Manager",
      avatar: "/images/testimonial/avatar-modified.png",
      content:
        "Building great products is all about understanding user needs and delivering solutions that exceed expectations.",
    },
    {
      id: 5,
      name: "John Smith",
      role: "Product Manager",
      avatar: "/images/testimonial/avatar-modified.png",
      content:
        "Building great products is all about understanding user needs and delivering solutions that exceed expectations.",
    },
    {
      id: 6,
      name: "John Smith",
      role: "Product Manager",
      avatar: "/images/testimonial/avatar-modified.png",
      content:
        "Building great products is all about understanding user needs and delivering solutions that exceed expectations.",
    },
    // Add more testimonials as needed
  ];
  return (
    <div className="container mx-auto mb-10">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1 py-10">
                <div className="relative card-wrapper max-w-[345px] mx-auto">
                  <Avatar
                    alt={testimonial.name}
                    src={testimonial.avatar}
                    sx={{ width: 70, height: 70 }}
                    className="absolute z-20 -translate-y-1/2 left-[40%]"
                  />
                  <Card className="transition-all duration-300 rounded-2xl hover:scale-110">
                    <CardContent className="p-6 mt-10 text-center">
                      <p className="mb-5 text-sm text-muted-foreground">
                        {testimonial.content}
                      </p>
                      <h3 className="mb-1 text-lg font-semibold">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
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

export default AlumniCarousel;
