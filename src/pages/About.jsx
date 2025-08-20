import React from "react";
import { Calendar, Award } from "lucide-react";
import principalImage from "../assets/principal.jpg";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import Message from "../component/Message";

const achievements = [
  "Best School Award 2023 - State Education Board",
  "Excellence in Science Education - National Recognition",
  "Outstanding Sports Performance - Regional Championship",
  "Digital Learning Innovation Award 2022",
  "Community Service Excellence Award",
];

const staff = [
  {
    name: "Krishna Kumar Upreti",
    position: "ChairMan",
    qualification: "Ph.D. in Educational Leadership",
    experience: "20+ years",
    image: principalImage,
  },
  {
    name: "Prof. Michael Chen",
    position: "Vice Principal",
    qualification: "M.Ed. in Curriculum Development",
    experience: "15+ years",
  },
  {
    name: "Ms. Emily Davis",
    position: "Academic Director",
    qualification: "M.A. in Education Management",
    experience: "12+ years",
  },
  {
    name: "Mr. Robert Wilson",
    position: "Sports Director",
    qualification: "M.P.Ed. in Sports Science",
    experience: "10+ years",
  },
];

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12 bg-gradient-to-br from-blue-50 to-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-4 drop-shadow-sm">
              About Bhagawati School
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              A blend of Culture and Quality education
            </p>
          </div>

          {/* History */}
          <section className="mb-20 bg-white rounded-3xl shadow-xl overflow-hidden px-6 md:px-12 py-10 max-w-6xl mx-auto">
            <div className="pb-6 border-b border-gray-200 bg-blue-50 rounded-t-3xl px-4 sm:px-6 text-center pt-4">
              <h2 className="text-4xl font-bold flex justify-center items-center gap-4 text-blue-800">
                <Calendar className="h-8 w-8" />
                Our History
              </h2>
            </div>

            <div className="pt-8 px-4 sm:px-6 space-y-6 text-[1.15rem] leading-8 text-gray-800">
              <p className="text-justify leading-relaxed">
                Founded in the year 2048 BS under the name Bhagawati English
                Secondary School, our esteemed institution has been an
                unwavering bastion of educational excellence in the beautiful
                nation of Nepal. Over the years, we have earned the recognition
                and approval of the Government of Nepal, cementing our status as
                a trusted provider of quality education.
              </p>
              <p className="text-justify leading-relaxed">
                Since our affiliation with the Higher Secondary Education Board
                in 2067, Bhagawati English Secondary School has been on an
                inspiring journey of academic growth and achievement. With each
                passing year, we have upheld a proud tradition of scholastic
                excellence, a testament to our commitment to nurturing the
                intellectual curiosity and potential of our students.
              </p>
              <p className="text-justify leading-relaxed">
                Celebrating our 32 years in operation, Bhagawati English
                Secondary School stands as a shining example of dedication and
                perseverance in the realm of education. Our consistent track
                record of academic success speaks volumes about the passion and
                expertise of our faculty members and the diligence of our
                students.
              </p>
              <p className="text-justify leading-relaxed">
                Nestled in the serene and picturesque surroundings of Kamalamal
                Municipality-06, Madhibazar, Sindhull, our school offers more
                than just a place of learning—it provides a sanctuary for
                intellectual exploration and personal growth. Surrounded by the
                tranquility of our location, students are inspired to delve
                deeper into their studies, fostering a love for learning that
                extends beyond the confines of the classroom.
              </p>
              <p className="text-justify leading-relaxed">
                Throughout our history, Bhagawati English Secondary School has
                left an indelible mark on the educational landscape of the
                bagmati province. Our commitment to excellence has not only
                enriched the lives of our students but has also contributed to
                the broader community by producing graduates who are equipped
                with the knowledge, skills, and values needed to succeed in an
                ever-changing world
              </p>
              <p className="text-justify leading-relaxed">As we embark on the next phase of our journey, Bhagawati
              English Secondary School remains steadfast in its mission to
              empower and inspire the leaders of tomorrow. We invite you to join
              us in this noble pursuit as we continue to uphold the highest
              standards of education and shape the future of Nepal, one student
              at a time.
              </p>
            </div>
          </section>

          {/* Principal's Message */}
          <Message />

          {/* Leadership Team */}
          <section className="mb-20 px-4 sm:px-8 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">
              Our Leadership Team
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {staff.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition duration-300"
                >
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 mx-auto mb-4 shadow-md border-2 border-blue-100">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-600">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-blue-700 font-medium mb-1">
                    {member.position}
                  </p>
                  {/* <p className="text-sm text-gray-600 mb-2">
                    {member.qualification}
                  </p> */}
                  <span className="inline-block px-3 py-1 border rounded-full text-sm border-gray-300 text-gray-700">
                    {member.experience}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-8 bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-blue-50 ">
              <h2 className="text-3xl text-center font-bold flex justify-center items-center gap-3 text-blue-800">
                <Award className="h-7 w-7" />
                Our Achievements
              </h2>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-5">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span className="text-gray-700 font-medium">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
