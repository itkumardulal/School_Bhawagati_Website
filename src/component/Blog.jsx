import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Trophy,
  Leaf,
  Palette,
  Dumbbell,
  Star,
  Calendar,
} from "lucide-react";
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

  const categoryIcons = {
    Education: BookOpen,
    Achievement: Trophy,
    Environment: Leaf,
    Sports: Dumbbell,
    Arts: Palette,
  };

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
              <h1 className="text-4xl font-bold text-blue-800">Latest Blogs</h1>
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
                {blogList.map((blog, index) => {
                  const Icon = categoryIcons[blog.category];
                  const firstImage = extractFirstImage(blog.content);
                  const textContent = extractTextContent(blog.content);
                  const truncatedContent =
                    textContent.length > 100
                      ? textContent.substring(0, 100) + "..."
                      : textContent;

                  return (
                    <div
                      key={blog.id}
                      className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transform transition-all duration-300 ease-in-out p-4 sm:p-5 border-t-4 border-blue-500 flex flex-col justify-between h-full w-full max-w-sm mx-auto animate-fadeInUp group"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      {/* Featured badge - always visible */}
                      {blog.featured && (
                        <div className="absolute top-3 right-3 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded-full flex items-center shadow z-10">
                          <Star className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">Featured</span>
                          <span className="sm:hidden">★</span>
                        </div>
                      )}

                      <div>
                        {/* Category above image */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-1.5 sm:p-2 rounded-full bg-gradient-to-br from-green-100 to-green-200 text-green-700 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 group-hover:bg-blue-100 transition-colors duration-300">
                            {blog.category}
                          </span>
                        </div>

                        {/* Extract first image from content */}
                        {firstImage && (
                          <div className="mb-3 overflow-hidden rounded-lg">
                            <img
                              src={firstImage}
                              alt={blog.title}
                              className="w-full h-40 sm:h-32 md:h-36 object-cover rounded-lg group-hover:scale-110 transition-transform duration-500 ease-out"
                            />
                          </div>
                        )}

                        <h2 className="font-bold text-base sm:text-lg md:text-xl mb-2 text-gray-800 line-clamp-2 break-words">
                          {blog.title}
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-sm md:text-base break-words overflow-hidden line-clamp-2 hyphens-auto word-wrap-anywhere">
                          {truncatedContent}
                        </p>

                        <div className="flex items-center justify-between mt-4">
                          <button
                            onClick={() => setSelectedBlog(blog)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-transparent border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out group-hover:shadow-lg"
                          >
                            Read More
                            <svg
                              className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>

                          {/* Facebook Share Button */}
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              window.location.origin + "/blogs/" + blog.id
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-50 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 group-hover:scale-110"
                            title="Share on Facebook"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 text-xs sm:text-sm md:text-base text-gray-500">
                        <span className="italic font-medium text-gray-600">
                          By {blog.author}
                        </span>
                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full group-hover:bg-blue-50 transition-colors duration-300">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                          <span className="font-medium">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {blogList.length > 0 && (
              <div className="w-full flex items-center justify-center mt-12">
                <button
                  onClick={() => navigate("/blogs")}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                >
                  View More
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
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
