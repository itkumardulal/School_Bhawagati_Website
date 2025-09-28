import React, { useState } from "react";
import { X, Download, ZoomIn, ZoomOut, RotateCw, Share2 } from "lucide-react";

const MobilePdfViewer = ({ pdfUrl, title, fileName, onClose, onDownload }) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showControls, setShowControls] = useState(true);

  // Zoom controls
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => setScale(1);

  // Rotation controls
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  // Toggle controls visibility
  const toggleControls = () => setShowControls((prev) => !prev);

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 mx-3">
            <h2 className="text-sm font-medium truncate text-center">
              {title}
            </h2>
          </div>

          <button
            onClick={onDownload}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-400 transition-colors"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* PDF Container */}
      <div
        className="relative flex-1 overflow-auto bg-gray-100"
        style={{ height: "calc(100vh - 140px)" }}
        onClick={toggleControls}
      >
        <div
          className="w-full h-full flex items-center justify-center p-2"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            transformOrigin: "center center",
            transition: "transform 0.3s ease",
          }}
        >
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0 rounded-lg shadow-lg"
            title={title || fileName}
            style={{ minHeight: "400px" }}
          />
        </div>
      </div>

      {/* Mobile Controls */}
      {showControls && (
        <div className="bg-white border-t border-gray-200 p-4 space-y-4">
          {/* Zoom Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleZoomOut}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ZoomOut className="w-5 h-5 text-gray-600" />
            </button>

            <div className="bg-gray-100 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-gray-700">
                {Math.round(scale * 100)}%
              </span>
            </div>

            <button
              onClick={handleZoomIn}
              className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ZoomIn className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={resetZoom}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleRotate}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <RotateCw className="w-4 h-4" />
              <span className="text-sm">Rotate</span>
            </button>

            <button
              onClick={onDownload}
              className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Download</span>
            </button>
          </div>

          {/* Instructions */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Tap the PDF to toggle controls • Pinch to zoom • Drag to pan
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button for Controls */}
      {!showControls && (
        <button
          onClick={toggleControls}
          className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MobilePdfViewer;
