import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../component/http";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Loader from "../component/Loader/Loader";

function Notice() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const currentDomain = window.location.hostname;
   useEffect(() => {
      const fetchNews = async () => {
        setLoading(true);
        try {
          const response = await API.get("/notices");
          if (response.status === 200) {
            setNotices(response.data.data);
          }
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Failed to fetch news:", error);
          }
        } finally {
          setLoading(false);
        }
      };

      fetchNews();
    }, [currentDomain]);

    if (loading) {
      return <Loader />;
    }

  const handleDownload = (url, filename = "notice.pdf") => {
    if (!url) {
      toast.error("No file available to download");
      return;
    }

    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(() => {
        toast.error("Error downloading file");
      });
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-[calc(100vh-448px)] px-4 py-10 max-w-6xl mx-auto w-full">
        {!selectedNotice ? (
          <>
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-blue-800 mb-2">Notice Board</h1>
              <p className="text-xl mt-2 text-gray-600">
                Stay updated with the latest announcements and important updates.
              </p>
            </div>

            <div className="space-y-6">
              {notices.length === 0 ? (
              <div className="flex justify-center items-center min-h-[100px]">
                <div className="bg-white border border-gray-300 rounded-xl px-6 py-8 shadow text-center max-w-xl w-full">
                  <p className="text-red-500 text-lg font-medium">
                    No notice updates are available at this time. Please revisit
                    this section soon.
                  </p>
                </div>
              </div>
              ) : (
                notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="bg-white rounded-lg shadow-md border border-gray-200 p-5 hover:bg-gray-50 transition flex justify-between items-center"
                    onClick={() => setSelectedNotice(notice)}
                  >
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{notice.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Published on: {new Date(notice.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(notice.pdfUrl, notice.pdfName || "notice.pdf");
                      }}
                      className="text-blue-600  hover:cursor-pointer "
                      title="Download Notice"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-7 h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 16a1 1 0 0 1-.707-.293l-5-5a1 1 0 1 1 1.414-1.414L11 12.586V4a1 1 0 1 1 2 0v8.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-5 5A1 1 0 0 1 12 16ZM4 20a1 1 0 0 1 0-2h16a1 1 0 1 1 0 2H4Z" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedNotice(null)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Notices</span>
            </button>

            <h2 className="text-3xl font-bold text-gray-800">{selectedNotice.title}</h2>

            <div className="rounded-lg p-4 bg-gray-50 border border-gray-300 flex justify-center">
              {selectedNotice.fileType === "image" ? (
                <img
                  src={selectedNotice.pdfUrl}
                  alt={selectedNotice.title}
                  className="max-w-full h-auto sm:max-h-[500px]"
                />
              ) : (
                <iframe
                  src={selectedNotice.pdfUrl}
                  className="w-full h-[400px] sm:h-[500px] rounded"
                  title="Notice File"
                />
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() =>
                  handleDownload(
                    selectedNotice.pdfUrl,
                    selectedNotice.pdfName || "notice.pdf"
                  )
                }
                className="px-4 py-2 flex items-center space-x-2 bg-green-600 rounded-md text-sm font-medium text-white hover:bg-green-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 16a1 1 0 0 1-.707-.293l-5-5a1 1 0 1 1 1.414-1.414L11 12.586V4a1 1 0 1 1 2 0v8.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-5 5A1 1 0 0 1 12 16ZM4 20a1 1 0 0 1 0-2h16a1 1 0 1 1 0 2H4Z" />
                </svg>
                <span>Download</span>
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Published on: {new Date(selectedNotice.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Notice;
