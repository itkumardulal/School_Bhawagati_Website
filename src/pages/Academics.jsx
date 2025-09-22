import React from "react";
import { BookOpen, Award, Microscope } from "lucide-react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../component/Tab";

const curriculumLevels = [
  {
    level: "Primary",
    grades: "Grades 1-5",
    subjects: [
      "English",
      "Mathematics",
      "Science",
      "Social Studies",
      "Art",
      "Physical Education",
      "Music",
    ],
    features: [
      "Interactive Learning",
      "Activity-Based Teaching",
      "Regular Assessments",
    ],
  },
  {
    level: "Secondary",
    grades: "Grades 6-10",
    subjects: [
      "English",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "History",
      "Geography",
      "Computer Science",
    ],
    features: ["Laboratory Work", "Project-Based Learning", "Career Guidance"],
  },
  {
    level: "Higher Secondary",
    grades: "Grades 11-12",
    subjects: [
      "Science Stream",
      "Commerce Stream",
      "Arts Stream",
      "Vocational Courses",
    ],
    features: [
      "Specialization",
      "Board Exam Preparation",
      "University Guidance",
    ],
  },
];

const Academics = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen py-6 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-5xl font-bold text-blue-800 mb-4">
              Academic Information
            </h1>
            <p className="text-base sm:text-2xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive educational programs designed to nurture academic
              excellence and holistic development
            </p>
          </div>

          <section className="mb-20">
            <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">
              Curriculum Structure
            </h2>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {curriculumLevels.map((level, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-50 bg-white shadow-lg hover:shadow-xl transition duration-300 p-6"
                >
                  <h3 className="text-2xl font-semibold text-blue-700 mb-1">
                    {level.level} Education
                  </h3>
                  <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-medium mb-4">
                    {level.grades}
                  </span>
                  <div className="mb-4">
                    <h4 className="text-xl font-medium text-gray-800 mb-2 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" /> Core Subjects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {level.subjects.map((subject, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-200 transition duration-200 cursor-pointer"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-gray-800 mb-2 flex items-center">
                      <Award className="h-5 w-5 mr-2" /> Key Features
                    </h4>
                    <ul className="space-y-1">
                      {level.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-lg  text-gray-600 flex items-center"
                        >
                          <span className="w-2 h-2  bg-blue-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <div className="relative rounded-2xl overflow-hidden h-[32rem] md:h-[40rem] shadow-lg">
              <img
                src='https://i.imgur.com/TjTmbBc.jpeg'
                alt="Modern Classroom"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-4xl md:text-5xl font-bold mb-4">
                    Modern Learning Environment
                  </h3>
                  <p className="text-2xl md:text-3xl">
                    State-of-the-art classrooms equipped with the latest
                    technology
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-14 px-4 sm:px-6 lg:px-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 text-center mb-12">
              Special Programs
            </h2>
            <Tabs defaultValue="stem">
              <TabsList className="grid grid-cols-2 gap-8 items-center justify-evenly sm:flex sm:flex-wrap sm:justify-start mb-6 text-center h-20 w-full">
                <TabsTrigger value="stem" className="text-lg sm:text-xl">
                  STEM Education
                </TabsTrigger>
                <TabsTrigger value="arts" className="text-lg sm:text-xl">
                  Arts & Culture
                </TabsTrigger>
                <TabsTrigger value="sports" className="text-lg sm:text-xl">
                  Sports
                </TabsTrigger>
                <TabsTrigger value="tech" className="text-lg sm:text-xl">
                  Technology
                </TabsTrigger>
              </TabsList>

              {/* STEM */}
              <TabsContent value="stem">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center text-blue-800">
                  <Microscope className="h-5 w-5 mr-2" /> STEM Education Program
                </h3>
                <p className="text-gray-600 mb-4 text-base sm:text-lg lg:text-xl">
                  Our comprehensive STEM program integrates Science, Technology,
                  Engineering, and Mathematics to prepare students for future
                  careers in these critical fields.
                </p>
                <ul className="space-y-2 text-base sm:text-lg">
                  {[
                    "Advanced laboratory facilities",
                    "Robotics and coding workshops",
                    "Science fair and competitions",
                    "Industry partnerships and field trips",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>

              {/* Arts */}
              <TabsContent value="arts">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-800">
                  Arts & Culture Program
                </h3>
                <p className="text-gray-600 mb-4 text-base sm:text-lg lg:text-xl">
                  Foster creativity and cultural appreciation through
                  comprehensive arts education including visual arts, music,
                  drama, and literature.
                </p>
                <ul className="space-y-2 text-base sm:text-lg">
                  {[
                    "Art studio and music rooms",
                    "Annual cultural festivals",
                    "Drama and theater productions",
                    "Creative writing workshops",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>

              {/* Sports */}
              <TabsContent value="sports">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-800">
                  Sports & Physical Education
                </h3>
                <p className="text-gray-600 mb-4 text-base sm:text-lg lg:text-xl">
                  Promote physical fitness, teamwork, and sportsmanship through
                  diverse athletic programs and competitive sports teams.
                </p>
                <ul className="space-y-2 text-base sm:text-lg">
                  {[
                    "Multiple sports facilities",
                    "Inter-school competitions",
                    "Professional coaching staff",
                    "Swimming pool and gymnasium",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>

              {/* Tech */}
              <TabsContent value="tech">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-800">
                  Technology Integration
                </h3>
                <p className="text-gray-600 mb-4 text-base sm:text-lg lg:text-xl">
                  Prepare students for the digital age with comprehensive
                  technology education and modern learning tools.
                </p>
                <ul className="space-y-2 text-base sm:text-lg">
                  {[
                    "Smart classrooms with interactive boards",
                    "Computer labs with latest software",
                    "Programming and web development",
                    "Digital literacy programs",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Academics;
