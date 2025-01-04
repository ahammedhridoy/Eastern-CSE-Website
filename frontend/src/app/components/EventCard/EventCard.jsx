"use client";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Button } from "@mui/material";
import { GlobalContext } from "@/context/GlobalContext";
import usePagination from "@/hooks/usePagination";
import ContentLoading from "../ContentLoading/ContentLoading";
import NoContentFound from "../NoContentFound/NoContentFound";

const EventCard = () => {
  const { blogs, loading } = useContext(GlobalContext);
  const { visibleCount, loadMore } = usePagination(8, 8);

  if (loading) {
    return <ContentLoading height="[300px]" />;
  }

  if (blogs?.length === 0) {
    return (
      <NoContentFound mesage="No Events & News Found!" height={"[300px]"} />
    );
  }

  return (
    <div className="mt-10 event-card">
      <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 lg:grid-cols-4">
        {blogs.slice(0, visibleCount).map((blog) => (
          <Link key={blog.id} href={`/events/${blog.id}`}>
            <Card
              sx={{ maxWidth: 345 }}
              className="transition-all duration-300 hover:scale-110"
            >
              <CardMedia
                component="img"
                height="194"
                image={`${process.env.NEXT_PUBLIC_IMAGE_URL}${blog?.image}`}
                alt={blog.title || "Event Image"}
                className="object-cover"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="text-[var(--black-color)]"
                >
                  {blog.title || "Untitled Blog"}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Load More */}
      {blogs?.length > visibleCount && (
        <div className="mt-10 text-center">
          <Button variant="contained" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
