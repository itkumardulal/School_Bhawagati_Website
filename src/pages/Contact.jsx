import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import API from "../component/http";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  validateForm,
  validationRules,
  sanitizeInput,
} from "../utils/validation";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Special handling for phone number - only allow numbers
    if (id === "phoneNumber") {
      const numbersOnly = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [id]: numbersOnly }));
    } else {
      const sanitizedValue = sanitizeInput(value);
      setFormData((prev) => ({ ...prev, [id]: sanitizedValue }));
    }

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const contactRules = {
      firstName: validationRules.firstName,
      lastName: validationRules.lastName,
      emailAddress: validationRules.email,
      phoneNumber: validationRules.phoneNumber,
      message: validationRules.message,
    };

    const validation = validateForm(formData, contactRules);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const hostname = window.location.hostname;
      const domain = hostname.replace(/^www\./, "");

      const response = await API.post("/message", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        schoolDomain: domain,
      });

      if (response.status === 201) {
        toast.success("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          emailAddress: "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Submission failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["Kamalamai 06,", " 02 Bazar", "Sindhuli, Nepal."],
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "+977 047-520179",
        "+977 985-4044140",
        "+977 985-4041567",
        "+977 9844094455",
      ],
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: ["bhagawati.hses@gmail.com", "info@bhagawatishool.com"],
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Sun - Fri: 10 AM - 5 PM", "Sat: Closed"],
    },
  ];

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-10 px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4 font-heading">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto font-body">
            We're here to help! Reach out to us for any information or queries.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-24 items-start max-w-7xl mx-auto">
          {/* Left - Info Section */}
          <div className="space-y-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center text-blue-900 font-heading">
              Get in Touch
            </h2>

            {/* Contact Cards */}
            {contactInfo.map((item, i) => (
              <div
                key={i}
                className="flex items-start bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 min-h-[140px]"
              >
                <div className="p-3 bg-blue-900 text-white rounded-full mr-6 mt-1">
                  <item.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-800 mb-2 font-heading">
                    {item.title}
                  </h3>
                  <div className="space-y-1">
                    {item.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className="text-gray-600 text-sm sm:text-base md:text-lg font-body"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Mini Map */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow hover:shadow-lg transition duration-300 min-h-[200px]">
              <h3 className="flex items-center text-blue-900 font-semibold mb-4 text-xl sm:text-2xl justify-center font-heading">
                <MapPin className="w-5 h-5 mr-2" /> Find Us on Map
              </h3>
              {/* Embed responsive iframe */}
              <div className="w-full h-48 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.4869140794467!2d85.91134127490524!3d27.203858547519133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb8b5ebff4e585%3A0x1db8e37f99d1ef6b!2sBhagawati%20Secondary%20School!5e0!3m2!1sen!2snp!4v1753429994442!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bhagawati Secondary School Location"
                />
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-6">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Bhagawati+Secondary+School"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-blue-600 text-blue-600 px-5 py-2.5 rounded-md hover:bg-blue-100 transition text-sm font-medium"
                >
                  Get Directions
                </a>
                <a
                  href="https://www.google.com/maps/place/Bhagawati+Secondary+School"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-blue-600 text-blue-600 px-5 py-2.5 rounded-md hover:bg-blue-100 transition text-sm font-medium"
                >
                  View in Maps
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form Section */}
          <div className="flex flex-col gap-10">
            {/* Form */}
            <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 min-h-[600px] flex flex-col">
              <div>
                <h2 className="text-2xl sm:text-3xl text-blue-900 font-semibold flex items-center mb-4 justify-center font-heading">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-8 text-sm sm:text-base text-center max-w-lg mx-auto px-4 font-body">
                  Fill out the form below and we'll respond shortly.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-1 text-base font-medium text-gray-700 font-body"
                      >
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        placeholder="Your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-1 text-base font-medium text-gray-700"
                      >
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="emailAddress"
                      className="block mb-1 text-base font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      id="emailAddress"
                      type="email"
                      placeholder="Your email address"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                        errors.emailAddress
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.emailAddress && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.emailAddress}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-1 text-base font-medium text-gray-700"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Your phone number "
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-1 text-base font-medium text-gray-700"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Type your message..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-lg flex justify-center items-center text-lg transition font-button ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-900 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Call and Email Boxes */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-4xl mx-auto">
              {/* Call Us Box */}
              <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center cursor-pointer hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-3">
                  <Phone className="w-7 h-7" />
                  Call Us
                </h3>
                <p className="text-center text-gray-700 text-lg">
                  <a
                    href="tel:+977047520179"
                    className="hover:text-blue-800 transition-colors duration-200"
                  >
                    +977 047-520179
                  </a>
                </p>
                <p className="text-center text-gray-500 mt-2 text-sm">
                  Available 9am - 6pm
                </p>
              </div>

              {/* Email Us Box */}
              <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center cursor-pointer hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-4 flex items-center gap-3 font-heading">
                  <Mail className="w-7 h-7" />
                  Email Us
                </h3>
                <p className="text-center text-gray-700 text-base sm:text-lg font-body">
                  <a
                    href="mailto:info@bhagawatishool.com"
                    className="hover:text-blue-800 transition-colors duration-200 break-all"
                  >
                    info@bhagawatishool.com
                  </a>
                </p>
                <p className="text-center text-gray-500 mt-2 text-xs sm:text-sm font-body">
                  We reply within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Campus Visit Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 sm:p-10 rounded-2xl text-center shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-3 font-heading">
              Visit Our School
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto mb-6 text-base sm:text-lg px-4 font-body">
              We welcome you to explore our school. Schedule a tour and discover
              what makes us special!
            </p>
            <div className="flex justify-center mt-4">
              <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-100 transition hover:cursor-pointer text-sm sm:text-base font-button">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
