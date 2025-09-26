import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "./http";
import Loader from "./Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogSection = () => {
  const navigate = useNavigate();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentDomain = window.location.hostname;

  // Extract first image from HTML content
  const extractFirstImage = (content) => {
    if (!content) return null;
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
    return imgMatch ? imgMatch[1] : null;
  };

  // Extract text content from HTML
  const extractTextContent = (content) => {
    if (!content) return "";
    return content.replace(/<[^>]*>/g, "").trim();
  };

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs");
        const allBlogs = res.data.data || [];

        setBlogList(allBlogs.slice(0, 2));
      } catch (error) {
        toast.error("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currentDomain]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 min-h-[calc(100vh-448px)]">
        {!selectedBlog ? (
          <>
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-blue-800">
                Latest Blogs
              </h1>
              <p className="text-gray-600 mt-2 text-xl">
                Insights and stories from our community
              </p>
            </div>

            {blogList.length === 0 ? (
              <div className="flex justify-center items-center min-h-[100px]">
                <div className="bg-white border border-gray-300 rounded-xl px-6 py-8 shadow text-center max-w-xl w-full">
                  <p className="text-red-500 text-lg font-medium">
                    No blog posts are available at this time. Please revisit
                    this section soon.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-14">
                {blogList.map((blog) => {
                  const firstImage = extractFirstImage(blog.content);
                  const textContent = extractTextContent(blog.content);
                  const truncatedContent =
                    textContent.length > 150
                      ? textContent.substring(0, 150) + "..."
                      : textContent;

                  return (
                    <div
                      key={blog.id}
                      className="bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      {firstImage && (
                        <div className="overflow-hidden group">
                          <div className="w-full h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden flex items-center justify-center bg-gray-100">
                            <img
                              src={firstImage}
                              alt={blog.title}
                              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                            />
                          </div>
                        </div>
                      )}

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {blog.category}
                            </span>
                            {blog.featured && (
                              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-900 line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-gray-600 text-base mt-2 line-clamp-2 text-justify leading-relaxed">
                            {truncatedContent}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            By {blog.author} •{" "}
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="mt-4">
                          <button
                            onClick={() => setSelectedBlog(blog)}
                            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition hover:cursor-pointer"
                          >
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {blogList.length > 0 && (
              <div className="w-full flex items-center justify-center mt-10">
                <button
                  onClick={() => navigate("/blogs")}
                  className="px-6 py-3 bg-white font-semibold rounded-full shadow transition-all duration-200 hover:cursor-pointer hover:bg-yellow-400"
                >
                  View More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-6 mt-10 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedBlog(null)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <h2 className="text-3xl font-bold text-gray-900">
              {selectedBlog.title}
            </h2>

            {extractFirstImage(selectedBlog.content) && (
              <div className="border border-gray-300 rounded-xl p-6 bg-white flex justify-center items-center min-h-[200px] shadow-sm">
                <img
                  src={extractFirstImage(selectedBlog.content)}
                  alt={selectedBlog.title}
                  className="max-w-full h-auto sm:max-h-[500px] rounded-md"
                />
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {selectedBlog.category}
              </span>
              {selectedBlog.featured && (
                <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>

            <div
              className="text-base text-gray-700 leading-relaxed text-justify prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />

            <div className="flex justify-between items-center text-sm text-gray-500 mt-4 pt-4 border-t">
              <span>By {selectedBlog.author}</span>
              <span>
                Published:{" "}
                {new Date(selectedBlog.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
