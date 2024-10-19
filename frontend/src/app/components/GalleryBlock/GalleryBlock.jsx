import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import Separator from "../Separator/Separator";
const GalleryBlock = () => {
  return (
    <div className="my-10">
      <h1 className="text-5xl text-center  text-[var(--black-color)] font-bold">
        Albums
      </h1>

      <Separator width="w-20" position="justify-center" />

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
  );
};

export default GalleryBlock;
