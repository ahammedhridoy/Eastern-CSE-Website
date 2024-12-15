"use client";
import React, { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { GlobalContext } from "@/context/GlobalContext";
import { useParams } from "next/navigation";
import DOMPurify from "dompurify";
import ContentLoading from "../ContentLoading/ContentLoading";
const FacultyDetailsCard = () => {
  const { singleFaculty, fetchSingleFaculty, loading } =
    useContext(GlobalContext);
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      fetchSingleFaculty(params.id);
    }
  }, []);

  if (loading || !singleFaculty) {
    return <ContentLoading height="screen" />;
  }

  // Sanitize HTML content to prevent XSS
  const sanitizedDescription = DOMPurify.sanitize(
    singleFaculty?.description || ""
  );

  return (
    <div className="">
      <Card>
        <Avatar
          sx={{ width: 300, height: 300 }}
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${singleFaculty?.image}`}
          alt={singleFaculty?.name || "Faculty Name"}
          className="mx-auto mt-2"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {singleFaculty?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-4">
            {singleFaculty?.designation}
          </Typography>
          <Typography
            variant="body2"
            className="text-justify text-[var(--gray-color)]"
          >
            <div
              className="text-justify text-[var(--gray-color)] blog-description"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyDetailsCard;
