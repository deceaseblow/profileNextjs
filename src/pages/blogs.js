import BlogCard from "../components/BlogCard";
import { useAppData } from "../context/AppDataContext";

const fontStyle = {
  fontFamily: "'antsValley', sans-serif",
};

function Blogs() {
  const { data, loading } = useAppData();

  if (loading) {
    return (
      <p className="text-center text-lg mt-10">
        Loading blogs...
      </p>
    );
  }

  if (!data.blogs || data.blogs.length === 0) {
    return (
      <p className="text-center text-lg mt-10">
        No blogs found.
      </p>
    );
  }

  return (
    <div className="pb-10 px-4 md:px-10">
      <h2
        className="text-center text-[22px] font-bold mb-2 capitalize text-black tracking-wider border-b-4 border-black pb-2 md:text-start md:text-[40px]"
        style={fontStyle}
      >
        Blog
      </h2>
      <p className="my-6">
        heyyyyyyyyyyy! huehuehuehue
      </p>

     <div className="flex flex-col gap-3 flex-wrap md:justify-start">
        {data.blogs.map((blog) => (
          <BlogCard
            key={blog._id}       
            title={blog.title}
            date={blog.date}
            image={blog.image}
            content={blog.content}
          />
        ))}
      </div>
    </div>
  );
}

export default Blogs;
