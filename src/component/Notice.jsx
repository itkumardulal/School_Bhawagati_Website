import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "./http";
import Loader from "./Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";

const NoticeSection = () => {
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentDomain = window.location.hostname;

  // Download notice function
  const handleDownload = async (notice) => {
    try {
      // If notice has a file URL, download it directly
      if (notice.pdfUrl || notice.fileUrl || notice.imgUrl) {
        const fileUrl = notice.pdfUrl || notice.fileUrl || notice.imgUrl;
        const filename =
          notice.pdfName ||
          notice.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".pdf";

        // Fetch the file and download it
        fetch(fileUrl)
          .then((response) => response.blob())
          .then((blob) => {
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(blobUrl);
            toast.success("Download started!");
          })
          .catch(() => {
            toast.error("Error downloading file");
          });
      } else {
        // If no file URL, create a PDF with notice content using jsPDF
        const doc = new jsPDF();

        // Set font and add title
        doc.setFontSize(20);
        doc.setTextColor(30, 64, 175); // Blue color
        doc.text(notice.title, 20, 30);

        // Add a line under title
        doc.setDrawColor(30, 64, 175);
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);

        // Add publication date
        doc.setFontSize(12);
        doc.setTextColor(107, 114, 128); // Gray color
        doc.text(
          `Published: ${new Date(notice.createdAt).toLocaleDateString()}`,
          20,
          50
        );

        // Add content
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); // Black color
        const splitDescription = doc.splitTextToSize(notice.description, 170);
        doc.text(splitDescription, 20, 70);

        // Add school name at bottom
        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128);
        doc.text("Bhagawati Secondary School", 20, 280);

        // Save the PDF
        const filename = `${notice.title
          .replace(/[^a-z0-9]/gi, "_")
          .toLowerCase()}.pdf`;
        doc.save(filename);
        toast.success("Notice downloaded as PDF!");
      }
    } catch (error) {
      toast.error("Failed to download notice");
    }
  };

  // Fetch notices from API
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await API.get("/notices");
        const allNotices = res.data.data || [];

        setNoticeList(allNotices.slice(0, 2));
      } catch (error) {
        toast.error("Failed to fetch notices");
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [currentDomain]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 min-h-[calc(100vh-448px)]">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-800">
            Important Notices
          </h1>
          <p className="text-gray-600 mt-2 text-xl">
            Official announcements and updates
          </p>
        </div>

        {noticeList.length === 0 ? (
          <div className="flex justify-center items-center min-h-[100px]">
            <div className="bg-white border border-gray-300 rounded-xl px-6 py-8 shadow text-center max-w-xl w-full">
              <p className="text-red-500 text-lg font-medium">
                No notices are available at this time. Please revisit this
                section soon.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {noticeList.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/notice")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Published on:{" "}
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(notice);
                      }}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors duration-200"
                      title="Download notice"
                    >
                      <Download className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {noticeList.length > 0 && (
          <div className="w-full flex items-center justify-center mt-10">
            <button
              onClick={() => navigate("/notices")}
              className="px-6 py-3 bg-white font-semibold rounded-full shadow transition-all duration-200 hover:cursor-pointer hover:bg-yellow-400"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeSection;
