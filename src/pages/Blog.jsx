import { useState, useEffect } from "react";
import {
  Search,
  BookOpen,
  Trophy,
  Leaf,
  Palette,
  Dumbbell,
  Star,
  Calendar,
} from "lucide-react";
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
  const [allPosts, setAllPosts] = useState([]); // Store all posts for frontend filtering
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const [categories, setCategories] = useState([
    "All",
    "Education",
    "Achievement",
    "Environment",
    "Sports",
    "Arts",
  ]);

  const categoryIcons = {
    Education: BookOpen,
    Achievement: Trophy,
    Environment: Leaf,
    Sports: Dumbbell,
    Arts: Palette,
  };

  const fetchBlogs = async (showLoader = true, page = 1, append = false) => {
    if (showLoader) {
      setLoading(true);
    } else if (append) {
      setLoadingMore(true);
    }

    try {
      // Build query parameters for server-side search and filtering
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "6",
      });

      // Add search parameter if present
      if (searchQuery.trim()) {
        queryParams.append("search", searchQuery.trim());
      }

      // Add category parameter if not "All"
      if (selectedCategory !== "All") {
        queryParams.append("category", selectedCategory);
      }

      // Get blogs from backend with server-side search/filtering and pagination
      const res = await API.get(`/blogs?${queryParams.toString()}`);

      const fetchedPosts = res.data.data || [];
      const pagination = res.data.pagination || {};

      // Update pagination state
      setCurrentPage(pagination.currentPage || page);
      setHasNextPage(pagination.hasNextPage || false);
      setTotalItems(pagination.totalItems || 0);

      if (append) {
        // Append new posts to existing ones (for load more)
        setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
        setAllPosts((prevAllPosts) => [...prevAllPosts, ...fetchedPosts]);
      } else {
        // Replace posts (initial load, search, or filter)
        setPosts(fetchedPosts);
        setAllPosts(fetchedPosts);
      }

      // Extract unique categories from posts and merge with predefined categories
      const backendCategories = new Set(
        fetchedPosts.map((post) => post.category).filter(Boolean)
      );
      const predefinedCategories = [
        "All",
        "Education",
        "Achievement",
        "Environment",
        "Sports",
        "Arts",
      ];
      const allCategories = [
        ...new Set([...predefinedCategories, ...backendCategories]),
      ];
      setCategories(allCategories);
    } catch (error) {
      toast.error("Failed to fetch blogs");
    } finally {
      if (showLoader) {
        setLoading(false);
      } else if (append) {
        setLoadingMore(false);
      }
    }
  };

  const loadMorePosts = async () => {
    if (hasNextPage && !loadingMore) {
      await fetchBlogs(false, currentPage + 1, true);
    }
  };

  const generateSuggestions = (query) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const queryLower = query.toLowerCase();
    const suggestionSet = new Set();

    // Generate suggestions from titles, authors, and content
    allPosts.forEach((post) => {
      // Add title suggestions
      if (post.title.toLowerCase().includes(queryLower)) {
        suggestionSet.add(post.title);
      }

      // Add author suggestions
      if (post.author.toLowerCase().includes(queryLower)) {
        suggestionSet.add(post.author);
      }

      // Add content snippets (first 50 characters of content)
      const contentText = post.content.replace(/<[^>]*>/g, ""); // Remove HTML tags
      if (contentText.toLowerCase().includes(queryLower)) {
        const snippet = contentText.substring(0, 50) + "...";
        suggestionSet.add(snippet);
      }
    });

    const suggestionsArray = Array.from(suggestionSet).slice(0, 5); // Limit to 5 suggestions
    setSuggestions(suggestionsArray);
    setShowSuggestions(suggestionsArray.length > 0);
  };

  // Server-side search and filtering - triggers API call
  const performSearchAndFilter = () => {
    // Reset to first page when searching/filtering
    setCurrentPage(1);
    setHasNextPage(false);

    // Show subtle search loading indicator
    setSearchLoading(true);

    // Fetch blogs with current search and filter parameters
    fetchBlogs(false, 1, false).finally(() => {
      setSearchLoading(false);
    });
  };

  // Handle category change specifically for "All"
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // If selecting "All", also clear search to show all blogs
    if (category === "All") {
      setSearchQuery("");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSearchInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  // Initial load with loader
  useEffect(() => {
    fetchBlogs(true).then(() => {
      setHasInitialLoad(true);
    }); // Show loader on initial load
  }, []);

  // Debounced search and filter effect with better UX
  useEffect(() => {
    // Don't run until initial load is complete
    if (!hasInitialLoad) {
      return;
    }

    // Generate suggestions when search query changes (for UI only)
    generateSuggestions(searchQuery);

    // Only search if query is at least 2 characters (unless it's empty)
    if (searchQuery.length > 0 && searchQuery.length < 2) {
      return;
    }

    // Debounce the search/filter API call to avoid too many requests
    const timeoutId = setTimeout(() => {
      performSearchAndFilter();
    }, 800); // Increased to 800ms for better UX

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, hasInitialLoad]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      <ToastContainer position="top-right" autoClose={2000} />
      <Navbar />

      <div className="text-center mb-8 mt-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-4 drop-shadow-sm font-heading">
          Discover Our Blogs
        </h1>
      </div>

      <div className="border-t-2 border-blue-200 py-6 mb-4"></div>

      <div className="container mx-auto pb-6 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => handleCategoryChange(c)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ease-in-out font-body font-semibold ${
                    selectedCategory === c
                      ? "bg-green-500 text-white shadow-md transform scale-105"
                      : "bg-yellow-100 text-gray-700 hover:bg-yellow-200 hover:scale-102"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center w-full md:w-96 bg-white shadow-lg rounded-full px-4 py-3 border border-blue-200 focus-within:ring-2 focus-within:ring-blue-400 transition-all duration-200 ease-in-out">
            {searchLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-3"></div>
            ) : (
              <Search className="w-5 h-5 text-blue-500 mr-3" />
            )}
            <input
              type="text"
              placeholder="Search posts..."
              className={`flex-1 text-base sm:text-sm md:text-base outline-none text-gray-700 placeholder-gray-400 transition-all duration-200 ${
                searchQuery.length > 0 && searchQuery.length < 2
                  ? "bg-yellow-50"
                  : ""
              }`}
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={handleSearchInputFocus}
              onBlur={handleSearchInputBlur}
            />

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700 truncate">
                        {suggestion}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          {/* Subtle loading overlay that doesn't cause blinking */}
          {searchLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center rounded-lg">
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                <span className="text-sm font-medium">Searching...</span>
              </div>
            </div>
          )}

          {posts.length === 0 && !searchLoading ? (
            <div className="text-center py-16">
              <BookOpen className="w-14 h-14 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 text-lg">
                No posts found. Try another search or filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-0">
              {posts.map((post, index) => {
                const Icon = categoryIcons[post.category];
                return (
                  <div
                    key={post.id}
                    className="relative bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-102 transform transition-all duration-300 ease-in-out p-4 sm:p-5 border-t-4 border-blue-500 flex flex-col justify-between h-full w-full max-w-sm mx-auto animate-fadeInUp"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    {/* Featured badge - always visible */}
                    {post.featured && (
                      <div className="absolute top-3 right-3 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded-full flex items-center shadow z-10">
                        <Star className="w-3 h-3 mr-1" />
                        <span className="hidden sm:inline">Featured</span>
                        <span className="sm:hidden">★</span>
                      </div>
                    )}

                    <div>
                      {/* Category above image */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 sm:p-2 rounded-full bg-green-100 text-green-600">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-blue-600">
                          {post.category}
                        </span>
                      </div>

                      {/* Extract first image from content */}
                      {(() => {
                        const imgMatch = post.content.match(
                          /<img[^>]+src="([^"]+)"/
                        );
                        return imgMatch ? (
                          <div className="mb-3">
                            <img
                              src={imgMatch[1]}
                              alt={post.title}
                              className="w-full h-40 sm:h-32 md:h-36 object-cover rounded-lg"
                            />
                          </div>
                        ) : null;
                      })()}

                      <h2 className="font-bold text-base sm:text-lg md:text-xl mb-2 text-gray-800 line-clamp-2 break-words">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm sm:text-sm md:text-base break-words overflow-hidden line-clamp-2 hyphens-auto word-wrap-anywhere">
                        {(() => {
                          const cleanContent = post.content
                            .replace(/<[^>]*>/g, "")
                            .trim();

                          const truncatedContent =
                            cleanContent.length > 100
                              ? cleanContent.substring(0, 100) + "..."
                              : cleanContent;

                          return truncatedContent;
                        })()}
                      </p>

                      <Link
                        to={`/blogs/${post.id}`}
                        className="mt-2 text-blue-600 font-medium hover:underline text-sm sm:text-sm md:text-base cursor-pointer inline-block"
                      >
                        Read More
                      </Link>
                    </div>

                    <div className="flex justify-between items-center mt-3 text-xs sm:text-sm md:text-base text-gray-500">
                      <span className="italic">By {post.author}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Load More Button */}
        {posts.length > 0 && hasNextPage && (
          <div className="flex justify-center mt-8 mb-8">
            <button
              onClick={loadMorePosts}
              disabled={loadingMore}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed font-button"
            >
              {loadingMore ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Loading More...
                </>
              ) : (
                <>
                  <span>Load More</span>
                  {/* <span className="text-sm opacity-75">
                    ({totalItems - posts.length} remaining)
                  </span> */}
                </>
              )}
            </button>
          </div>
        )}

        {/* No more posts message */}
        {posts.length > 0 && !hasNextPage && posts.length < totalItems && (
          <div className="text-center mt-8 mb-8">
            <p className="text-gray-500 text-sm">
              Showing all {posts.length} of {totalItems} posts
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogList;
