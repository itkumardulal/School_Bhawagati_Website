import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Share2, Calendar } from "lucide-react";
import Loader from "../component/Loader/Loader";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import API from "../component/http";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const cleanId = id.trim();
        const res = await API.get(`/blogs/spa/${cleanId}`);
        setBlog(res.data.data);
      } catch (err) {
        setError("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Update meta tags when blog data is loaded
  useEffect(() => {
    if (blog) {
      // Extract first image from content
      const imgMatch = blog.content.match(/<img[^>]+src="([^"]+)"/);
      const firstImage = imgMatch ? imgMatch[1] : "";

      // Create description (first 150 characters of content without HTML)
      const contentText = blog.content.replace(/<[^>]*>/g, "").trim();
      const description =
        contentText.length > 150
          ? contentText.substring(0, 150) + "..."
          : contentText;

      // Set static browser tab title
      document.title = "Bhagawati Secondary School";

      // Create or update Open Graph meta tags for Facebook sharing
      const updateOrCreateMetaTag = (property, content) => {
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (!metaTag) {
          metaTag = document.createElement("meta");
          metaTag.setAttribute("property", property);
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute("content", content);
      };

      // Update Open Graph meta tags
      updateOrCreateMetaTag("og:title", blog.title);
      updateOrCreateMetaTag("og:description", description);
      updateOrCreateMetaTag("og:url", window.location.href);
      updateOrCreateMetaTag("og:type", "article");
      updateOrCreateMetaTag("og:site_name", "Bhagawati Secondary School");

      if (firstImage) {
        updateOrCreateMetaTag("og:image", firstImage);
        updateOrCreateMetaTag("og:image:width", "1200");
        updateOrCreateMetaTag("og:image:height", "630");
      }

      // Add article meta tags
      updateOrCreateMetaTag("article:author", blog.author);
      updateOrCreateMetaTag("article:published_time", blog.createdAt);
    }
  }, [blog]);

  if (loading) return <Loader />;
  if (!blog) return <p className="text-center py-16">Blog not found</p>;

  return (
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
              window.location.href
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
          {blog.title}
        </h1>

        {/* Blog Content */}
        <div
          className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Author & Date */}
        <div className="flex justify-between items-center mt-6 text-sm sm:text-base text-gray-500 flex-wrap gap-2">
          <span>By {blog.author}</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-blue-500" />
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleBlog;
