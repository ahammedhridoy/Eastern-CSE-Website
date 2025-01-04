"use client";
import React, { useContext } from "react";
import ContentLoading from "../ContentLoading/ContentLoading";
import { GlobalContext } from "@/context/GlobalContext";
import usePagination from "@/hooks/usePagination";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import NoContentFound from "../NoContentFound/NoContentFound";

const AlbumCardHome = () => {
  const { albums, loading } = useContext(GlobalContext);
  const { visibleCount, loadMore } = usePagination(8, 8);

  if (loading) {
    return <ContentLoading height="[300px]" />;
  }

  if (albums?.length === 0) {
    return <NoContentFound mesage="No Album Found!" height={"[300px]"} />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 p-4 mt-10 md:grid-cols-2 lg:grid-cols-4 albums">
        {albums?.slice(0, visibleCount).map((album) => (
          <Link key={album?.id} href={`/gallery/${album?.id}`}>
            <Card
              sx={{ maxWidth: 345 }}
              className="transition-all duration-300 hover:scale-105"
            >
              <CardMedia
                component="img"
                height="194"
                image={`${process.env.NEXT_PUBLIC_IMAGE_URL}${album?.image}`}
                alt={album?.name || "Album"}
                className="cursor-pointer h-[300px] p-2 object-cover"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {album?.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Load More */}
      {albums.length > visibleCount && (
        <div className="mt-10 text-center">
          <Button variant="contained" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default AlbumCardHome;
