import BlogCard from "@/app/components/Dashboard/BlogCard";
import Sidebar from "@/app/components/Dashboard/Sidebar";

const blogs = [
  {
    id: 1,
    image: "/path/to/image1.jpg",
    date: "01 Jan 2024",
    title: "What is Done is Done ✨",
    author: { name: "Author1", avatar: "/path/to/avatar1.jpg" },
  },
  {
    id: 2,
    image: "/path/to/image2.jpg",
    date: "23 Apr 2024",
    title: "Fresh Prince",
    author: { name: "Author2", avatar: "/path/to/avatar2.jpg" },
  },
  // Add more blog data here...
];

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full p-4 bg-gray-50 lg:p-8">
        <h1 className="mb-4 text-xl font-bold lg:text-2xl">Blog</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
