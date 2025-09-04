import React from "react";
import {
  Calculator,
  BarChart3,
  BookOpen,
  Music,
  Briefcase,
  FlaskConical,
  Cpu,
  Heart,
  MessageSquare,
} from "lucide-react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

// Card Component
const Card = ({ children, className }) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-200 
    hover:shadow-lg hover:scale-105 cursor-pointer 
    transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

// ClubCard Component
const ClubCard = ({ title, description, icon: Icon, gradient }) => {
  return (
    <Card className="min-h-[260px] flex flex-col group">
      {/* Top Border */}
      <div className={`h-1.5 rounded-t-xl ${gradient}`} />

      <div className="p-6 flex flex-col flex-grow">
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-3 rounded-xl ${gradient} bg-opacity-10`}>
            <Icon className="h-7 w-7 text-gray-800" />
          </div>
          {/* Gradient Title */}
          <h3
            className={`text-2xl sm:text-xl md:text-2xl font-semibold bg-clip-text text-transparent ${gradient}`}
          >
            {title}
          </h3>
        </div>

        {/* Description */}
        <p
          className="leading-relaxed text-lg sm:text-[16px] md:text-[18px] lg:text-[19px] 
          text-gray-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
        >
          {description}
        </p>
      </div>
    </Card>
  );
};

// Clubs Data
const clubs = [
  {
    title: "Academic Club",
    description:
      "Foster academic excellence through peer learning, study groups, and scholarly discussions across various disciplines.",
    icon: BookOpen,
    gradient: "bg-gradient-to-r from-blue-500 to-indigo-500",
  },
  {
    title: "Music and Art Club",
    description:
      "Express creativity through music, visual arts, and performance. Join concerts, art exhibitions, and creative workshops.",
    icon: Music,
    gradient: "bg-gradient-to-r from-pink-500 to-rose-500",
  },
  {
    title: "Entrepreneurship & Management Club",
    description:
      "Develop business acumen, leadership skills, and entrepreneurial mindset through case studies and startup initiatives.",
    icon: Briefcase,
    gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
  {
    title: "Science and Innovation Club",
    description:
      "Explore cutting-edge scientific research, conduct experiments, and participate in innovation challenges.",
    icon: FlaskConical,
    gradient: "bg-gradient-to-r from-purple-500 to-violet-500",
  },
  {
    title: "Technology and AI Club",
    description:
      "Dive deep into emerging technologies, AI development, and participate in hackathons and tech competitions.",
    icon: Cpu,
    gradient: "bg-gradient-to-r from-cyan-500 to-blue-500",
  },
  {
    title: "CSR Club",
    description:
      "Make a positive impact through community service, social responsibility projects, and volunteer initiatives.",
    icon: Heart,
    gradient: "bg-gradient-to-r from-red-500 to-pink-500",
  },
  {
    title: "English Language Club",
    description:
      "Enhance communication skills through debates, language exchanges, and cross-cultural interactions.",
    icon: MessageSquare,
    gradient: "bg-gradient-to-r from-orange-500 to-amber-600",
  },
  {
    title: "Management & Finance Club",
    description:
      "Master financial literacy, investment strategies, and management principles through practical workshops.",
    icon: Calculator,
    gradient: "bg-gradient-to-r from-indigo-500 to-purple-600",
  },
  {
    title: "Research & Data Analysis Club",
    description:
      "Conduct meaningful research, master data analytics tools, and present findings at academic conferences.",
    icon: BarChart3,
    gradient: "bg-gradient-to-r from-teal-500 to-cyan-600",
  },
];

// Main Page
const Index = () => {
  return (
   <>
   <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-8 px-6 text-center">
        <h1 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 
        bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Student Clubs
        </h1>
        <p className="text-lg sm:text-base md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Discover our vibrant communities that match your interests.
          Connect with like-minded students, develop new skills, and create
          lasting memories.
        </p>
      </section>

      {/* Clubs Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club) => (
            <ClubCard
              key={club.title}
              title={club.title}
              description={club.description}
              icon={club.icon}
              gradient={club.gradient}
            />
          ))}
        </div>
      </section>
    </div>
    <Footer/>
   </>
  );
};

export default Index;

