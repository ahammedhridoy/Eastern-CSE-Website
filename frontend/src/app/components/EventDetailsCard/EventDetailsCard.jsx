"use client";
import React, { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { GlobalContext } from "@/context/GlobalContext";
import ContentLoading from "../ContentLoading/ContentLoading";
import { useParams } from "next/navigation";
import DOMPurify from "dompurify";
const EventDetailsCard = () => {
  const { singleBlog, fetchSingleBlog, loading } = useContext(GlobalContext);
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      fetchSingleBlog(params.id);
    }
  }, []);

  if (loading || !singleBlog) {
    return <ContentLoading height="screen" />;
  }

  // Sanitize HTML content to prevent XSS
  const sanitizedDescription = DOMPurify.sanitize(
    singleBlog?.description || "",
    {
      ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "ul", "ol", "li"],
      ALLOWED_ATTR: ["href", "target"],
    }
  );

  return (
    <div className="">
      <Card>
        <CardMedia
          image={`${process.env.NEXT_PUBLIC_IMAGE_URL}${singleBlog?.image}`}
          title={singleBlog?.title || "Event Image"}
          className="object-cover h-[300px] md:h-[600px]"
          alt={singleBlog?.title || "Event Image"}
          quality={100}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="text-[var(--black-color)] mb-4 pl-4"
          >
            {singleBlog?.title || "Untitled Blog"}
          </Typography>

          <p className="pl-4 mb-4">
            {new Date(singleBlog?.createdAt).toISOString().split("T")[0]}
          </p>

          <Typography
            variant="body2"
            className="text-justify text-[var(--gray-color)]"
          >
            <div
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              style={{
                listStyleType: "initial",
                paddingLeft: "20px",
              }}
            ></div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetailsCard;
