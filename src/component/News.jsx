import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "./http";

const NewsSection = () => {
  const navigate = useNavigate();
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentDomain = window.location.hostname;

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await API.get("/news");
        const allNews = res.data.data || [];

        // Filter by domain
        const filteredNews = allNews
          .filter((news) => news.schoolDomain === currentDomain)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date DESC

        setNewsList(filteredNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [currentDomain]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading news...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 min-h-[calc(100vh-448px)]">
        {!selectedNews ? (
          <>
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-blue-800">News</h1>
              <p className="text-gray-600 mt-2 text-xl">
                Latest updates and announcements
              </p>
            </div>

            {newsList.length === 0 ? (
              <div className="flex justify-center items-center min-h-[100px]">
                <div className="bg-white border border-gray-300 rounded-xl px-6 py-8 shadow text-center max-w-xl w-full">
                  <p className="text-red-500 text-lg font-medium">
                    No news available.
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
                    <div className="overflow-hidden group">
                      <div className="w-full h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden flex items-center justify-center bg-gray-100">
                        {news.imgUrl ? (
                          <img
                            src={news.imgUrl}
                            alt={news.title}
                            className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                          />
                        ) : (
                          <span className="text-gray-500 text-base">
                            No image to preview
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-gray-600 text-base mt-2 line-clamp-1">
                          {news.description}
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

            {newsList.length > 0 && (
              <div className="w-full flex items-center justify-center mt-10">
                <button
                  onClick={() => navigate("/notices")}
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
              onClick={() => setSelectedNews(null)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <h2 className="text-3xl font-bold text-gray-900">
              {selectedNews.title}
            </h2>

            <div className="border border-gray-300 rounded-xl p-6 bg-white flex justify-center items-center min-h-[200px] shadow-sm">
              {selectedNews.imgUrl ? (
                <img
                  src={selectedNews.imgUrl}
                  alt={selectedNews.title}
                  className="max-w-full h-auto sm:max-h-[500px] rounded-md"
                />
              ) : (
                <p className="text-gray-500 italic ">
                  No image uploaded for this news.
                </p>
              )}
            </div>

            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedNews.description}
            </p>

            <p className="text-sm text-gray-500 mt-4">
              Published: {new Date(selectedNews.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;
