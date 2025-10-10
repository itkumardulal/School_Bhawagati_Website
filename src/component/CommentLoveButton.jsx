import React, { useState, useEffect } from "react";
import API from "./http";

const CommentLoveButton = ({ commentId, initialLoves = 0 }) => {
  const [loves, setLoves] = useState(initialLoves);
  const [isLoved, setIsLoved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState("");

  useEffect(() => {
    // Check if user has already loved this comment
    const lovedComments = JSON.parse(
      localStorage.getItem("lovedComments") || "[]"
    );
    setIsLoved(lovedComments.includes(commentId));
  }, [commentId]);

  const handleLove = async () => {
    if (isLoved) {
      setShowMessage("You already loved this comment ❤️");
      setTimeout(() => setShowMessage(""), 3000);
      return;
    }

    setIsLoading(true);
    try {
      const response = await API.post(`/comments/love/${commentId}`);

      if (response.data.success) {
        setLoves(response.data.data.loves);
        setIsLoved(true);

        // Add to localStorage
        const lovedComments = JSON.parse(
          localStorage.getItem("lovedComments") || "[]"
        );
        lovedComments.push(commentId);
        localStorage.setItem("lovedComments", JSON.stringify(lovedComments));

        setShowMessage("Thank you for loving this comment! ❤️");
        setTimeout(() => setShowMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error loving comment:", error);
      setShowMessage("Failed to love comment. Please try again.");
      setTimeout(() => setShowMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center space-x-2">
      <button
        onClick={handleLove}
        disabled={isLoading}
        className={`
          flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-300 transform
          ${
            isLoved
              ? "bg-red-50 text-red-500 scale-110 shadow-md"
              : "bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:scale-105"
          }
          ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <svg
          className={`w-4 h-4 transition-all duration-300 ${
            isLoved ? "fill-current" : "stroke-current"
          }`}
          fill={isLoved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="text-xs font-medium">{loves}</span>
        {isLoading && (
          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        )}
      </button>

      {showMessage && (
        <div className="absolute top-full left-0 mt-2 px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg text-xs text-gray-700 whitespace-nowrap z-10">
          {showMessage}
        </div>
      )}
    </div>
  );
};

export default CommentLoveButton;
