"use client";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Avatar, Button } from "@mui/material";
import { GlobalContext } from "@/context/GlobalContext";
import usePagination from "@/hooks/usePagination";
import ContentLoading from "../ContentLoading/ContentLoading";
import NoContentFound from "../NoContentFound/NoContentFound";

const FacultyCard = () => {
  const { faculties, loading } = useContext(GlobalContext);
  const { visibleCount, loadMore } = usePagination(8, 8);

  if (loading) {
    return <ContentLoading height="[300px]" />;
  }

  if (faculties?.length === 0) {
    return <NoContentFound mesage="No Faculty Found!" height={"[300px]"} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 p-4 mt-10 md:grid-cols-2 lg:grid-cols-4 faculty-card">
        {faculties.slice(0, visibleCount).map((faculty) => (
          <Link key={faculty?.id} href={`/faculty/${faculty?.id}`}>
            <Card
              sx={{ maxWidth: 345 }}
              className="transition-all duration-300 hover:scale-110"
            >
              <Avatar
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${faculty?.image}`}
                alt={faculty?.title || "Event Image"}
                className="mx-auto mt-2 md:w-[300px] md:h-[300px] w-[200px] h-[200px]"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {faculty?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {faculty?.designation}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Load More */}
      {faculties?.length > visibleCount && (
        <div className="mt-10 text-center">
          <Button variant="contained" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default FacultyCard;
