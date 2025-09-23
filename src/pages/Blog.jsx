import { useState, useMemo, useEffect } from "react";
import { Search, BookOpen, Trophy, Leaf, Palette, Dumbbell, Star, Calendar } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import API from "../component/http";
import Loader from "../component/Loader/Loader";

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Education", "Achievement", "Environment", "Sports", "Arts"];
  const categoryIcons = { Education: BookOpen, Achievement: Trophy, Environment: Leaf, Sports: Dumbbell, Arts: Palette };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs");
        setPosts(res.data.data || []);
      } catch (error) {
        toast.error("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      <ToastContainer position="top-right" autoClose={2000} />
      <Navbar />

      <div className="text-center mb-8 mt-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-4 drop-shadow-sm">
          Discover Our Blogs
        </h1>
      </div>

      <div className="border-t-2 border-blue-200 py-6 mb-4"></div>

      <div className="container mx-auto pb-6 px-4 sm:px-6 lg:px-8 mb-8">
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

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-14 h-14 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 text-lg">No posts found. Try another search or filter.</p>
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => {
              const Icon = categoryIcons[post.category];
              return (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transform transition duration-200 p-6 sm:p-8 border-t-4 border-blue-500 flex flex-col justify-between"
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
                      <span className="text-sm font-medium text-blue-600">{post.category}</span>
                    </div>

                    <h2 className="font-bold text-xl sm:text-2xl mb-4 text-gray-800">{post.title}</h2>
                    <p className="text-gray-600 text-base sm:text-lg">
                      {post.content.slice(0, 100)}...
                    </p>

                    <Link
                      to={`/blogs/${post.id}`}
                      className="mt-3 text-blue-600 font-medium hover:underline text-sm sm:text-base cursor-pointer inline-block"
                    >
                      Read More
                    </Link>
                  </div>

                  <div className="flex justify-between items-center mt-6 text-sm sm:text-base text-gray-500">
                    <span className="italic">By {post.author}</span>
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
  );
};

export default BlogList;
