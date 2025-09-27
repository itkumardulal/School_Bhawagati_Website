import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import API from "../component/http";
import Loader from "../component/Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewsSection = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const currentDomain = window.location.hostname;
  const fetchNews = async (showLoader = true, page = 1, append = false) => {
    if (showLoader) {
      setLoading(true);
    } else if (append) {
      setLoadingMore(true);
    }

    try {
      const response = await API.get(`/news?page=${page}&limit=6`);
      if (response.status === 200) {
        const fetchedNews = response.data.data || [];
        const pagination = response.data.pagination || {};

        // Update pagination state
        setCurrentPage(pagination.currentPage || page);
        setHasNextPage(pagination.hasNextPage || false);
        setTotalItems(pagination.totalItems || 0);

        if (append) {
          // Append new news to existing ones
          setNewsList((prevNews) => [...prevNews, ...fetchedNews]);
        } else {
          // Replace news (initial load)
          setNewsList(fetchedNews);
        }
      }
    } catch (error) {
      toast.error("Failed to fetch news");
    } finally {
      if (showLoader) {
        setLoading(false);
      } else if (append) {
        setLoadingMore(false);
      }
    }
  };

  const loadMoreNews = async () => {
    if (hasNextPage && !loadingMore) {
      await fetchNews(false, currentPage + 1, true);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [currentDomain]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-448px)] max-w-7xl mx-auto px-4 pb-12 pt-8">
        {!selectedNews ? (
          <>
            {/* Header */}
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-blue-800 font-heading">
                News
              </h1>
              <p className="text-gray-600 mt-2 text-xl">
                Latest updates and announcements
              </p>
            </div>

            {/* News Grid */}
            {newsList.length === 0 ? (
              <div className="flex justify-center items-center min-h-[100px]">
                <div className="bg-white border border-gray-300 rounded-xl px-6 py-8 shadow text-center max-w-xl w-full">
                  <p className="text-red-500 text-lg font-medium">
                    No news updates are available at this time. Please revisit
                    this section soon.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-14">
                {newsList.map((news) => (
                  <div
                    key={news.id}
                    className="bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {news.imgUrl && (
                      <div className="overflow-hidden group">
                        <div className="w-full h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img
                            src={news.imgUrl}
                            alt={news.title}
                            className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                          />
                        </div>
                      </div>
                    )}

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-gray-600 text-base mt-2 line-clamp-1 text-justify leading-relaxed">
                          {" "}
                          {news.description}{" "}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Published:{" "}
                          {new Date(news.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={() => setSelectedNews(news)}
                          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition hover:cursor-pointer"
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {newsList.length > 0 && hasNextPage && (
              <div className="flex justify-center mt-8 mb-8">
                <button
                  onClick={loadMoreNews}
                  disabled={loadingMore}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Loading More...
                    </>
                  ) : (
                    <>
                      <span>Load More</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* No more news message */}
            {newsList.length > 0 &&
              !hasNextPage &&
              newsList.length < totalItems && (
                <div className="text-center mt-8 mb-8">
                  <p className="text-gray-500 text-sm">
                    Showing all {newsList.length} of {totalItems} news
                  </p>
                </div>
              )}
          </>
        ) : (
          // Expanded news view
          <div className="space-y-6 mt-4 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedNews(null)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition hover:cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <h2 className="text-3xl font-bold text-gray-900 text-center">
              {selectedNews.title}
            </h2>

            {selectedNews.imgUrl && (
              <div className="border border-gray-300 rounded-xl p-6 bg-white flex justify-center items-center min-h-[200px] shadow-sm">
                <img
                  src={selectedNews.imgUrl}
                  alt={selectedNews.title}
                  className="max-w-full h-auto sm:max-h-[500px] rounded-md"
                />
              </div>
            )}

            <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line text-justify">
              {selectedNews.description}
            </p>

            <p className="text-base text-gray-500 mt-4">
              Published: {new Date(selectedNews.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewsSection;
