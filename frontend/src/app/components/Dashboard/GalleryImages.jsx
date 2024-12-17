"use client";
import React, { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import ContentLoading from "../ContentLoading/ContentLoading";
import NoContentFound from "../NoContentFound/NoContentFound";
import Separator from "../Separator/Separator";
import usePagination from "@/hooks/usePagination";
import { Button, Card, Typography } from "@mui/material";
import GalleryCard from "./GalleryCard";

const GalleryImages = () => {
  const { allImages, loading } = useContext(GlobalContext);
  const { visibleCount, loadMore } = usePagination(4, 8);

  if (loading) {
    return <ContentLoading height="screen" />;
  }

  if (allImages?.length === 0) {
    return <NoContentFound mesage="No Image Found!" height={"[300px]"} />;
  }

  return (
    <div>
      <Card className="w-full p-4">
        <Typography gutterBottom variant="h5" component="div">
          All Images
        </Typography>
        <Separator position="justify-start" />

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {allImages.slice(0, visibleCount).map((item, index) => (
            <GalleryCard key={index} item={item} />
          ))}
        </div>

        {allImages?.length > visibleCount && (
          <div className="mt-10 text-center">
            <Button variant="contained" onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default GalleryImages;
