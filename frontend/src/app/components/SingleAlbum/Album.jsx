"use client";
import React, { useContext } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { GlobalContext } from "@/context/GlobalContext";
import { useParams } from "next/navigation";
import ContentLoading from "../ContentLoading/ContentLoading";
import usePagination from "@/hooks/usePagination";
import { Button } from "@mui/material";
import NoContentFound from "../NoContentFound/NoContentFound";

const Album = () => {
  const [open, setOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { fetchImages, images, loading } = useContext(GlobalContext);
  const { albumId } = useParams();
  const { visibleCount, loadMore } = usePagination(16, 16);

  React.useEffect(() => {
    fetchImages(albumId);
  }, []);

  if (loading) {
    return <ContentLoading height="screen" />;
  }

  if (images?.length === 0) {
    return <NoContentFound mesage="No Image Found!" height={"[300px]"} />;
  }

  const lightboxImages = images.map((item) => ({
    src: `${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.image}`,
  }));

  const handleClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <div className="container p-10 album">
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={lightboxImages}
        plugins={[Thumbnails]}
        index={currentIndex}
      />

      {/* Image List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.slice(0, visibleCount).map((item, index) => (
          <Image
            key={item?.id}
            onClick={() => handleClick(index)}
            width={500}
            height={500}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.image}`}
            alt={item?.album}
            loading="lazy"
            style={{ objectFit: "cover" }}
            className="object-cover transition-all duration-300 border-2 border-white rounded-sm cursor-pointer hover:scale-105"
          />
        ))}
      </div>

      {images.length > visibleCount && (
        <div className="mt-10 text-center">
          <Button variant="contained" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default Album;
