import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Share2, Calendar, MessageCircle, Send } from "lucide-react";
import Loader from "../component/Loader/Loader";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import API from "../component/http";
import SEO from "../component/SEO";
import CommentLoveButton from "../component/CommentLoveButton";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentForm, setCommentForm] = useState({
    name: "",
    comment: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Ref for scrolling to success message
  const successMessageRef = useRef(null);

  // Comments visibility and pagination
  const [showComments, setShowComments] = useState(false);
  const [displayedComments, setDisplayedComments] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalCommentsCount, setTotalCommentsCount] = useState(0);
  const commentsPerPage = 5;

  // Admin replies visibility
  const [showAdminReplies, setShowAdminReplies] = useState({}); // Track which comments have admin replies visible

  // Toggle admin replies visibility
  const toggleAdminReplies = (commentId) => {
    setShowAdminReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await API.get(`/blogs/spa/${id}`);

        // Check if the response has data (the API returns message instead of success)
        if (response.data.data) {
          setBlog(response.data.data);
        } else {
          console.error("Failed to fetch blog - no data in response");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Fetch comments with pagination
  const fetchComments = useCallback(
    async (page = 1, append = false) => {
      try {
        setLoadingMore(true);
        const url = `/comments/blog/${encodeURIComponent(
          blog?.title || ""
        )}?page=${page}&limit=${commentsPerPage}`;

        const res = await API.get(url);

        if (res.data.success) {
          const newComments = res.data.data || [];

          if (append) {
            setComments((prev) => [...prev, ...newComments]);
          } else {
            setComments(newComments);
          }

          // Use pagination metadata if available
          if (res.data.pagination) {
            setHasMoreComments(res.data.pagination.hasNextPage);
            setTotalCommentsCount(res.data.pagination.totalItems);
          } else {
            // Fallback logic
            setHasMoreComments(res.data.data.length === commentsPerPage);
            setTotalCommentsCount(res.data.data.length);
          }

          setCurrentPage(page);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoadingComments(false);
        setLoadingMore(false);
      }
    },
    [blog?.title, commentsPerPage]
  );

  // Fetch comment count
  const fetchCommentCount = useCallback(async () => {
    try {
      const res = await API.get(
        `/comments/blog/${encodeURIComponent(blog?.title || "")}?page=1&limit=1`
      );
      if (res.data.success && res.data.pagination) {
        setTotalCommentsCount(res.data.pagination.totalItems);
      }
    } catch (error) {
      console.error("Error fetching comment count:", error);
    }
  }, [blog?.title]);

  // Load comments when blog is available
  useEffect(() => {
    if (blog?.title) {
      fetchComments(1, false);
      fetchCommentCount();
    }
  }, [blog?.title, fetchComments, fetchCommentCount]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Sanitize input to prevent XSS
  const sanitizeInput = (input) => {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<[^>]*>/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "")
      .trim();
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!commentForm.name.trim()) {
      errors.name = "Name is required";
    } else if (commentForm.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters long";
    } else if (commentForm.name.trim().length > 20) {
      errors.name = "Name must not exceed 20 characters";
    }

    // Comment validation
    if (!commentForm.comment.trim()) {
      errors.comment = "Comment is required";
    } else if (commentForm.comment.trim().length < 5) {
      errors.comment = "Comment must be at least 5 characters long";
    } else if (commentForm.comment.trim().length > 100) {
      errors.comment = "Comment must not exceed 100 characters";
    }

    return errors;
  };

  // Handle comment submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSubmitting(true);

    try {
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(commentForm.name),
        comment: sanitizeInput(commentForm.comment),
        blogTitle: blog.title,
      };

      const res = await API.post("/comments", sanitizedData);

      if (res.data.success) {
        setSubmitSuccess(true);
        setCommentForm({ name: "", comment: "" });
        setShowCommentForm(false);

        // Show comments section after successful submission
        setShowComments(true);
        setCurrentPage(1);
        setHasMoreComments(true);

        // Increment total comment count
        setTotalCommentsCount((prev) => prev + 1);

        // Refresh comments from page 1
        fetchComments(1, false);

        // Scroll to success message after a short delay to ensure DOM update
        setTimeout(() => {
          if (successMessageRef.current) {
            successMessageRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 100);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      setFormErrors({
        general: "Failed to submit comment. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Blog not found
          </h1>
          <Link
            to="/blogs"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${blog.title} | Hamro Bhagawati`}
        description={blog.content?.replace(/<[^>]*>/g, "").substring(0, 160)}
        keywords={blog.category || "blog, education, school"}
        image={`https://www.hamrobhagawati.com${blog.image}`}
        url={`https://www.hamrobhagawati.com/blogs/${id}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: blog.title,
          description: blog.content?.replace(/<[^>]*>/g, "").substring(0, 160),
          image: `https://www.hamrobhagawati.com${blog.image}`,
          author: {
            "@type": "Person",
            name: blog.author || "Hamro Bhagawati",
          },
          publisher: {
            "@type": "Organization",
            name: "Hamro Bhagawati",
            logo: {
              "@type": "ImageObject",
              url: "https://www.hamrobhagawati.com/logo.png",
            },
            address: {
              "@type": "PostalAddress",
              addressCountry: "Nepal",
            },
          },
          datePublished: blog?.createdAt || "",
          dateModified: blog?.updatedAt || blog?.createdAt || "",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.hamrobhagawati.com/blogs/${blog?.id || ""}`,
          },
        }}
      />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
        <Navbar />
        <div className="w-full max-w-3xl mx-auto px-6 sm:px-12 mt-6 mb-12">
          <div className="flex flex-wrap gap-3 mb-6">
            <Link
              to="/blogs"
              className="flex items-center gap-2 text-white font-semibold border border-blue-500 bg-blue-500 rounded-[9px] px-4 py-2 text-sm sm:text-base hover:bg-blue-600"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </Link>

            {/* Facebook Share */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `https://www.hamrobhagawati.com/blogs/${id}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-[9px] text-sm sm:text-base shadow transition"
            >
              <Share2 className="w-4 h-4" />
              Share on Facebook
            </a>
          </div>

          {/* Blog Title */}
          <h1 className="font-bold text-3xl sm:text-4xl mb-4 text-gray-800">
            {blog?.title || ""}
          </h1>

          {/* Blog Content */}
          <div
            className="prose prose-lg max-w-none font-body"
            dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
          />

          {/* Author & Date */}
          <div className="flex justify-between items-center mt-6 text-sm sm:text-base text-gray-500 flex-wrap gap-2">
            <span>By {blog?.author || ""}</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(blog?.createdAt || "").toLocaleDateString()}
            </span>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div
              ref={successMessageRef}
              className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
            >
              Your comment has been submitted for review.
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-800">
                Comments ({totalCommentsCount})
              </h2>
            </div>

            {/* View Comments and Add Comment Buttons */}
            <div className="mb-6 flex flex-wrap gap-3">
              {/* View Comments Button (Left) */}
              {totalCommentsCount > 0 && (
                <button
                  onClick={() => setShowComments(!showComments)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                    showComments
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  {showComments
                    ? "Hide Comments"
                    : `View Comments (${totalCommentsCount})`}
                </button>
              )}

              {/* Add Comment Button (Right) */}
              <button
                onClick={() => {
                  setShowCommentForm(!showCommentForm);
                  setShowComments(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                  showCommentForm
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                {showCommentForm ? "Cancel" : "Add Comment"}
              </button>
            </div>

            {/* Comment Form */}
            {showCommentForm && (
              <form
                onSubmit={handleSubmitComment}
                className="mb-8 bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Leave a Comment
                </h3>

                {/* General Error */}
                {formErrors.general && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {formErrors.general}
                  </div>
                )}

                {/* Name Input */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={commentForm.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    maxLength={20}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.name}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {commentForm.name.length}/20 characters
                  </p>
                </div>

                {/* Comment Input */}
                <div className="mb-4">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Comment *
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={commentForm.comment}
                    onChange={handleInputChange}
                    placeholder="Add your comment"
                    rows={4}
                    maxLength={100}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                      formErrors.comment ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.comment && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.comment}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {commentForm.comment.length}/100 characters
                  </p>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Comment
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCommentForm(false);
                      setCommentForm({ name: "", comment: "" });
                      setFormErrors({});
                    }}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Comments List - Only show when View Comments is clicked */}
            {showComments && (
              <>
                {loadingComments ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-6">
                      {comments.map((comment) => {
                        // Check if this comment has admin replies
                        const adminReplies =
                          comment.replies?.filter(
                            (reply) => reply.isAdminReply
                          ) || [];
                        const hasAdminReplies = adminReplies.length > 0;

                        return (
                          <div key={comment.id} className="space-y-4">
                            {/* Main Comment */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="font-bold text-gray-900 text-lg">
                                  {comment.name}
                                </h4>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {new Date(
                                    comment.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-700 mb-4 leading-relaxed">
                                {comment.comment}
                              </p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                  {/* Show View Reply button only if admin has replied */}
                                  {hasAdminReplies && (
                                    <button
                                      onClick={() =>
                                        toggleAdminReplies(comment.id)
                                      }
                                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center gap-1"
                                    >
                                      {showAdminReplies[comment.id] ? (
                                        <>
                                          <span>Hide reply</span>
                                          <svg
                                            className="w-4 h-4 transform rotate-180"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </>
                                      ) : (
                                        <>
                                          <span>View reply</span>
                                          <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </>
                                      )}
                                    </button>
                                  )}
                                </div>
                                <CommentLoveButton
                                  commentId={comment.id}
                                  initialLoves={comment.loves || 0}
                                />
                              </div>
                            </div>

                            {/* Admin Replies */}
                            {showAdminReplies[comment.id] &&
                              hasAdminReplies && (
                                <div className="ml-6 space-y-3">
                                  {adminReplies.map((adminReply) => (
                                    <div
                                      key={adminReply.id}
                                      className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                                    >
                                      <div className="flex justify-between items-start mb-2">
                                        <span className="font-semibold text-blue-900">
                                          Author
                                        </span>
                                        <span className="text-xs text-blue-600">
                                          {new Date(
                                            adminReply.createdAt
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <p className="text-blue-800 leading-relaxed">
                                        {adminReply.comment}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Load More Button */}
                    {hasMoreComments && (
                      <div className="flex justify-center mt-6">
                        <button
                          onClick={() => fetchComments(currentPage + 1, true)}
                          disabled={loadingMore}
                          className="px-5 py-2 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600 hover:shadow-lg transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                          {loadingMore ? (
                            <>
                              <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></div>
                              Loading...
                            </>
                          ) : (
                            <>
                              Load More Comments
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SingleBlog;
