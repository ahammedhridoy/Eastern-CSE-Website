import Image from "next/image";
import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import Separator from "@/app/components/Separator/Separator";

function Gallery() {
  return (
    <div className="min-h-screen gallery">
      {/* Banner */}
      <div className="relative banner">
        <Image
          src={"/images/contact/contact-banner.jpg"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
          alt="Banner"
        />
        <h1 className="absolute z-10 text-3xl font-bold text-white -translate-x-1/2 -translate-y-1/2 md:text-5xl top-1/2 left-1/2">
          Gallery
        </h1>
        <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
      </div>
      {/* content */}
      <div className="container my-10">
        <h1 className="text-5xl text-center text-[var(--black-color)] font-bold">
          Albums
        </h1>
        <Separator />
        {/* Albums */}
        <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 lg:grid-cols-4 albums">
          <Link href={"/gallery/sadsa"}>
            <Card
              sx={{ maxWidth: 345 }}
              className="transition-all duration-300 hover:scale-110"
            >
              <CardMedia
                component="img"
                height="194"
                image="/images/about/about-us.webp"
                alt="Paella dish"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </Card>
          </Link>

          <Link href={"/gallery/sadsa"}>
            <Card
              sx={{ maxWidth: 345 }}
              className="transition-all duration-300 hover:scale-110"
            >
              <CardMedia
                component="img"
                height="194"
                image="/images/about/about-us.webp"
                alt="Paella dish"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </Card>
          </Link>

          <Link href={"/gallery/sadsa"}>
            <Card
              sx={{ maxWidth: 345 }}
              className="transition-all duration-300 hover:scale-110"
            >
              <CardMedia
                component="img"
                height="194"
                image="/images/about/about-us.webp"
                alt="Paella dish"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </Card>
          </Link>

          <Link href={"/gallery/sadsa"}>
            <Card
              sx={{ maxWidth: 345 }}
              className="transition-all duration-300 hover:scale-110"
            >
              <CardMedia
                component="img"
                height="194"
                image="/images/about/about-us.webp"
                alt="Paella dish"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </Card>
          </Link>

          <Link href={"/gallery/sadsa"}>
            <Card
              sx={{ maxWidth: 345 }}
              className="transition-all duration-300 hover:scale-110"
            >
              <CardMedia
                component="img"
                height="194"
                image="/images/about/about-us.webp"
                alt="Paella dish"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </Card>
          </Link>

          <Link href={"/gallery/sadsa"}>
            <Card
              sx={{ maxWidth: 345 }}
              className="transition-all duration-300 hover:scale-110"
            >
              <CardMedia
                component="img"
                height="194"
                image="/images/about/about-us.webp"
                alt="Paella dish"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Load More */}
        <div className="mt-10 text-center">
          <Button variant="contained">Load More</Button>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
