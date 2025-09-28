import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PdfViewer = ({
  pdfUrl,
  title,
  fileName,
  onClose,
  onDownload,
  isFullscreen = false,
}) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreenMode, setIsFullscreenMode] = useState(isFullscreen);
  const iframeRef = useRef(null);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen();
      setIsFullscreenMode(true);
    } else {
      document.exitFullscreen();
      setIsFullscreenMode(false);
    }
  };

  // Handle escape key for fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isFullscreenMode) {
        setIsFullscreenMode(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreenMode]);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError("Failed to load PDF. Please try downloading the file.");
  };

  // Zoom controls
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => setScale(1);

  // Rotation controls
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  // Page controls (for multi-page PDFs)
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div
      className={`${
        isFullscreenMode ? "fixed inset-0 z-50 bg-white" : "relative"
      }`}
    >
      {/* Header Controls */}
      <div className="bg-gray-800 text-white p-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-md transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="hidden sm:block">
            <h2 className="text-sm font-medium truncate max-w-xs">
              {title || fileName}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Page Navigation */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-1 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-sm px-2">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-1 hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 border-l border-gray-600 pl-2 ml-2">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-gray-700 rounded"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span className="text-sm px-2 min-w-[3rem] text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-gray-700 rounded"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              onClick={resetZoom}
              className="px-2 py-1 text-xs hover:bg-gray-700 rounded"
              title="Reset zoom"
            >
              Reset
            </button>
          </div>

          {/* Other Controls */}
          <div className="flex items-center space-x-1 border-l border-gray-600 pl-2 ml-2">
            <button
              onClick={handleRotate}
              className="p-1 hover:bg-gray-700 rounded"
              title="Rotate"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1 hover:bg-gray-700 rounded"
              title={isFullscreenMode ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreenMode ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onDownload}
              className="p-1 hover:bg-gray-700 rounded"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Content Area */}
      <div
        className="relative bg-gray-100 flex-1 overflow-auto"
        style={{ height: isFullscreenMode ? "calc(100vh - 60px)" : "70vh" }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading PDF...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center p-6">
              <div className="text-red-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={onDownload}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Download File
              </button>
            </div>
          </div>
        )}

        <div
          className="w-full h-full flex items-center justify-center p-4"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            transformOrigin: "center center",
          }}
        >
          <iframe
            ref={iframeRef}
            src={pdfUrl}
            className="w-full h-full border-0 rounded-lg shadow-lg"
            title={title || fileName}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            style={{ minHeight: "500px" }}
          />
        </div>
      </div>

      {/* Mobile-specific controls */}
      <div className="sm:hidden bg-white border-t border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 bg-gray-100 rounded-md"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 bg-gray-100 rounded-md"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onDownload}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
