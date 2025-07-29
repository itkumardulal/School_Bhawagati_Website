import React, { useState } from "react";
import {
  Calendar,
  FileText,
  Download,
  CheckCircle,
  Users,
  DollarSign,
} from "lucide-react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import API from "../component/http";

const admissionProcess = [
  {
    step: 1,
    title: "Online Application",
    description: "Fill out the online application form with required documents",
    icon: FileText,
  },
  {
    step: 2,
    title: "Document Verification",
    description: "Submit required documents for verification",
    icon: CheckCircle,
  },
  {
    step: 3,
    title: "Entrance Test",
    description: "Appear for the entrance examination (for applicable grades)",
    icon: Users,
  },
  {
    step: 4,
    title: "Interview",
    description: "Personal interview with student and parents",
    icon: Users,
  },
  {
    step: 5,
    title: "Fee Payment",
    description: "Complete admission by paying the required fees",
    icon: DollarSign,
  },
];

const importantDates = [
  { event: "Application Form Available", date: "January 15, 2024" },
  { event: "Last Date for Submission", date: "March 31, 2024" },
  { event: "Entrance Test", date: "April 15-20, 2024" },
  { event: "Results Declaration", date: "April 30, 2024" },
  { event: "Admission Confirmation", date: "May 15, 2024" },
  { event: "Academic Session Begins", date: "June 1, 2024" },
];

const eligibilityRequirements = [
  {
    grade: "Grade 1",
    age: "5-6 years",
    requirements: [
      "Birth Certificate",
      "Medical Certificate",
      "Previous School Records (if applicable)",
    ],
  },
  {
    grade: "Grades 2-5",
    age: "As per grade",
    requirements: [
      "Previous year report card",
      "Transfer Certificate",
      "Character Certificate",
    ],
  },
  {
    grade: "Grades 6-10",
    age: "As per grade",
    requirements: [
      "Previous year report card",
      "Transfer Certificate",
      "Character Certificate",
      "Entrance Test",
    ],
  },
  {
    grade: "Grades 11-12",
    age: "As per grade",
    requirements: [
      "Grade 10 Certificate",
      "Transfer Certificate",
      "Character Certificate",
      "Entrance Test",
    ],
  },
];

const Card = ({ children, className }) => (
  <div
    className={`bg-white shadow-md rounded-lg border border-gray-200 ${
      className || ""
    }`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="border-b border-gray-200 px-6 py-4">{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h3
    className={`text-xl sm:text-2xl font-semibold text-gray-900 ${
      className || ""
    }`}
  >
    {children}
  </h3>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className || ""}`}>{children}</div>
);

const Button = ({
  children,
  variant,
  type = "button",
  className,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md px-5 py-3 text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  };
  const appliedClass = variants[variant || "default"] || variants.default;
  return (
    <button
      type={type}
      className={`${baseClasses} ${appliedClass} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant, className }) => {
  const baseClasses =
    "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold";
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700",
  };
  const appliedClass = variants[variant || "default"] || variants.default;
  return (
    <span className={`${baseClasses} ${appliedClass} ${className || ""}`}>
      {children}
    </span>
  );
};

const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${
        className || ""
      }`}
      {...props}
    />
  )
);

const Label = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    {children}
  </label>
);

const Textarea = React.forwardRef(({ className, rows = 3, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${
      className || ""
    }`}
    {...props}
  />
));

const Select = ({ children, className, ...props }) => (
  <select
    className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${
      className || ""
    }`}
    {...props}
  >
    {children}
  </select>
);

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const Admissions = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gradeApplyingFor: "",
    dob: "",
    gender: "",
    guardianName: "",
    phoneNumber: "",
    emailAddress: "",
    Address: "",
    previousSchool: "",
    additionalInformation: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const domain = window.location.hostname; // e.g. "localhost:5174"
      await API.post("/admission", {
        ...formData,
        schoolDomain: domain,
      });

      alert("Admission form submitted successfully");
      setFormData({
        fullName: "",
        gradeApplyingFor: "",
        dob: "",
        gender: "",
        guardianName: "",
        phoneNumber: "",
        emailAddress: "",
        Address: "",
        previousSchool: "",
        additionalInformation: "",
      });
    } catch (error) {
      console.error("Error submitting admission:", error);
      alert(error.response?.data?.message || "Submission failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-6 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-12 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-4 leading-tight">
              Admissions 2024-25
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Join our vibrant learning community. Applications are now open for
              the academic year 2024-25
            </p>
            <div className="mt-6 text-xl px-6 py-3 shadow-lg bg-blue-900 text-white rounded-full w-fit h-14 flex items-center justify-center mx-auto font-bold">
              Applications Open - Limited Seats Available
            </div>
          </div>

          {/* Admission Process */}
          <section className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 text-center mb-12 tracking-wide">
              Admission Process
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {admissionProcess.map(
                ({ step, title, description, icon: Icon }) => (
                  <Card
                    key={step}
                    className="text-center relative p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="bg-blue-900 text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="absolute -top-3 -right-3 bg-yellow-300  w-9 h-9 rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                      {step}
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{title}</h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {description}
                    </p>
                  </Card>
                )
              )}
            </div>
          </section>

          {/* Important Dates */}
          <section className="mb-20">
            <Card className="max-w-8xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl text-blue-700 flex justify-center items-center gap-3">
                  <Calendar className="h-6 w-6 sm:h-7 sm:w-7" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {importantDates.map(({ event, date }, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 shadow-sm"
                    >
                      <span className="font-medium text-lg text-gray-800">
                        {event}
                      </span>
                      <Badge variant="outline" className="text-sm">
                        {date}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Eligibility & Requirements */}
          <section className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 text-center mb-12 tracking-wide">
              Eligibility & Requirements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto px-2 sm:px-4">
              {eligibilityRequirements.map(
                ({ grade, age, requirements }, idx) => (
                  <Card
                    key={idx}
                    className="hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <CardTitle className="text-lg sm:text-xl">
                        {grade}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className="text-sm sm:text-base"
                      >
                        {age}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-4 text-gray-900 text-xl">
                        Required Documents:
                      </h4>
                      <ul className="space-y-2">
                        {requirements.map((req, i) => (
                          <li
                            key={i}
                            className="text-base text-gray-700 flex items-center space-x-2"
                          >
                            <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </section>

          {/* Online Application Form */}
          <section className="mb-20 max-w-4xl mx-auto px-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl md:text-3xl text-blue-700 mb-2">
                  Online Application Form
                </CardTitle>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  Fill out the form below to start your admission process. All
                  fields marked with * are required.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">Student's Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="gradeApplyingFor">
                        Grade Applying For *
                      </Label>
                      <Select
                        id="gradeApplyingFor"
                        value={formData.gradeApplyingFor}
                        onChange={handleChange}
                      >
                        <option value="">Select Grade</option>
                        {[
                          "Grade 1",
                          "Grade 2",
                          "Grade 3",
                          "Grade 4",
                          "Grade 5",
                          "Grade 6",
                          "Grade 7",
                          "Grade 8",
                          "Grade 9",
                          "Grade 10",
                          "Grade 11",
                          "Grade 12",
                        ].map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dob">Date of Birth </Label>
                      <Input
                        type="date"
                        id="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <Select
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="guardianName">Guardian's Name *</Label>
                      <Input
                        id="guardianName"
                        value={formData.guardianName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Contact Number *</Label>
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emailAddress">Email Address *</Label>
                      <Input
                        type="email"
                        id="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="previousSchool">Previous School</Label>
                      <Input
                        id="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="Address">Complete Address *</Label>
                      <Textarea
                        id="Address"
                        value={formData.Address}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="additionalInformation">
                        Additional Information
                      </Label>
                      <Textarea
                        id="additionalInformation"
                        value={formData.additionalInformation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button type="submit">Submit Application</Button>
                    <Button type="button" variant="outline">
                      Save as Draft
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Download Forms */}
          <section className="mb-16 max-w-5xl mx-auto px-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl text-blue-700">
                  Download Forms
                </CardTitle>
                <p className="text-gray-600 text-sm sm:text-base">
                  Download printable application forms and information brochures
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    "Application Form PDF",
                    "Information Brochure",
                    "Fee Structure",
                  ].map((label, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="h-auto p-6 flex flex-col items-center space-y-3 hover:bg-gray-50"
                    >
                      <Download className="h-10 w-10 text-blue-600" />
                      <span className="text-blue-700 font-medium text-base">
                        {label}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admissions;
