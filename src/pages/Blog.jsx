import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Calendar,
  BookOpen,
  Trophy,
  Leaf,
  Palette,
  Dumbbell,
  Star,
  ArrowLeft,
  Share2,
} from "lucide-react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../component/http";
import Loader from "../component/Loader/Loader";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedPost, setExpandedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Education",
    "Achievement",
    "Environment",
    "Sports",
    "Arts",
  ];
  const categoryIcons = {
    Education: BookOpen,
    Achievement: Trophy,
    Environment: Leaf,
    Sports: Dumbbell,
    Arts: Palette,
  };

  // Fetch blogs from API
  const currentDomain = window.location.hostname;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await API.get("/blogs");
        const allBlogs = res.data.data || [];
        setPosts(allBlogs);
      } catch (error) {
        toast.error("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentDomain]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const toggleExpand = (id) => {
    setExpandedPost((prev) => (prev === id ? null : id));
  };

  if (loading) return <Loader />;

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
        <Navbar />

        {!expandedPost && (
          <div className="text-center mb-8 mt-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-4 drop-shadow-sm">
              Discover Our Blogs
            </h1>
          </div>
        )}

        {!expandedPost && (
          <div className="border-t-2 border-blue-200 py-6 mb-4"></div>
        )}

        <div className="container mx-auto pb-6 px-4 sm:px-6 lg:px-8 mb-8">
          {!expandedPost && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-3 justify-center md:justify-end md:ml-4">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedCategory === c
                        ? "bg-green-500 text-white shadow-md"
                        : "bg-yellow-100 text-gray-700 hover:bg-yellow-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex items-center w-full md:w-96 bg-white shadow-lg rounded-full px-4 py-3 border border-blue-200 focus-within:ring-2 focus-within:ring-blue-400 transition">
                <Search className="w-5 h-5 text-blue-500 mr-3" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="flex-1 text-base sm:text-sm md:text-base outline-none text-gray-700 placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}

          {expandedPost && (
            <div className="mb-6 mt-6 w-full max-w-3xl mx-auto px-8 sm:px-12 flex flex-row flex-wrap gap-3 items-center">
              {/* Back Button */}
              <button
                onClick={() => setExpandedPost(null)}
                className="flex items-center gap-2 text-white font-semibold border border-blue-500 bg-blue-500 rounded-[9px] px-4 py-2 text-sm sm:text-base hover:bg-blue-600 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>

              {/* Facebook Share Button */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-[9px] text-sm sm:text-base shadow transition"
              >
                <Share2 className="w-5 h-5" /> Share on Facebook
              </a>
            </div>
          )}

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-14 h-14 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 text-lg">
                No posts found. Try another search or filter.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-10 ${
                expandedPost
                  ? "grid-cols-1 place-items-center"
                  : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {filteredPosts.map((post) => {
                const Icon = categoryIcons[post.category];
                const isExpanded = expandedPost === post.id;

                if (expandedPost && !isExpanded) return null;

                return (
                  <div
                    key={post.id}
                    className={`bg-white rounded-2xl shadow-md transform transition duration-200 flex flex-col justify-between relative border-t-4 border-blue-500 ${
                      expandedPost
                        ? "w-full max-w-3xl mx-auto flex flex-col justify-start p-8 sm:p-12 mt-6 mb-12"
                        : "hover:shadow-xl hover:scale-105 p-6 sm:p-8"
                    }`}
                  >
                    {post.featured && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-xs font-semibold px-3 py-1 rounded-full flex items-center shadow">
                        <Star className="w-3 h-3 mr-1" /> Featured
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <div className="p-2 rounded-full bg-green-100 text-green-600">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-blue-600">
                          {post.category}
                        </span>
                      </div>

                      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl mb-4 text-gray-800 leading-snug break-words">
                        {post.title}
                      </h2>

                      <div className="text-gray-600 text-base sm:text-lg md:text-lg text-justify break-words">
                        {expandedPost
                          ? post.content.split("\n").map((line, index) => {
                              // Heading detection (I., II., etc.)
                              if (/^[IVXLCDM]+\./.test(line.trim())) {
                                return (
                                  <h2
                                    key={index}
                                    className="font-bold text-xl sm:text-2xl md:text-3xl mt-4 mb-2"
                                  >
                                    {line.trim()}
                                  </h2>
                                );
                              }
                              // Numbered list detection (1., 2., etc.)
                              if (/^\d+\./.test(line.trim())) {
                                return (
                                  <p
                                    key={index}
                                    className="mb-2 ml-4 list-inside list-decimal"
                                  >
                                    {line.trim()}
                                  </p>
                                );
                              }
                              // Normal paragraph
                              return (
                                <p key={index} className="mb-4">
                                  {line.trim()}
                                </p>
                              );
                            })
                          : `${post.content.slice(0, 100)}...`}
                      </div>

                      {!expandedPost && (
                        <button
                          onClick={() => toggleExpand(post.id)}
                          className="mt-3 text-blue-600 font-medium hover:underline text-sm sm:text-base cursor-pointer"
                        >
                          Read More
                        </button>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-6 text-sm sm:text-base text-gray-500 flex-wrap gap-2">
                      <span className="text-gray-500 text-sm italic">By {post.author}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span> 
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
