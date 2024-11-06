import { Avatar } from "@mui/material";

const BlogCard = ({ image, date, title, author }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md">
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-48 md:h-60"
      />
      <div className="p-4">
        <div className="flex items-center mb-2">
          <Avatar src={author.avatar} alt={author.name} className="mr-2" />
          <div className="text-sm text-gray-500">{date}</div>
        </div>
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
      </div>
    </div>
  );
};

export default BlogCard;
