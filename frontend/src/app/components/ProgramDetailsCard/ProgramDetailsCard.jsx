"use client";
import React, { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { GlobalContext } from "@/context/GlobalContext";
import { useParams } from "next/navigation";
import ContentLoading from "../ContentLoading/ContentLoading";
import DOMPurify from "dompurify";

const ProgramDetailsCard = () => {
  const { singleProgram, fetchSingleProgram, loading } =
    useContext(GlobalContext);
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      fetchSingleProgram(params.id);
    }
  }, []);

  if (loading || !singleProgram) {
    return <ContentLoading height="screen" />;
  }

  // Sanitize HTML content to prevent XSS
  const sanitizedDescription = DOMPurify.sanitize(singleProgram?.description);

  return (
    <div className="">
      <Card>
        <CardMedia
          image={`${process.env.NEXT_PUBLIC_IMAGE_URL}${singleProgram?.image}`}
          title={singleProgram?.title || "Event Image"}
          className="object-cover h-[300px] md:h-[300px]"
          alt={singleProgram?.title || "Event Image"}
          quality={100}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="text-[var(--black-color)] mb-4 pl-4"
          >
            {singleProgram?.title || "Untitled Program"}
          </Typography>

          <div
            className="quill-content"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            style={{
              listStyleType: "initial",
              paddingLeft: "20px",
            }}
          ></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramDetailsCard;
