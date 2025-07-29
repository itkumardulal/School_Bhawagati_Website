import { Link } from "react-router-dom";
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

const quickLinks = [
  { name: "About Us", to: "/about" },
  { name: "Academics", to: "/academics" },
  { name: "Admissions", to: "/admissions" },
  { name: "Notices", to: "/notices" },
];

const programs = [
  "Primary Education",
  "Secondary Education",
  "Higher Secondary",
  "Extracurricular Activities",
];

const contactInfo = [
  { icon: MapPin, text: "Kamalamai Municipality-06, 02-Bazar, Sindhuli, Nepal" },
  { icon: Phone, text: "   +977-047-520179 ,+977-985-4044140 " },
  { icon: Mail, text: " bhagawati.hses@gmail.com , info@bhagawatishool.com" },
];

const socialIcons = [Facebook, Twitter, Instagram, Youtube];

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-blue-100 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* School Info */}
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <GraduationCap className="h-9 w-9" />
            <span className="text-2xl font-bold">Bhagawati School</span>
          </div>
          <p className="text-lg text-blue-200">
           A blend of Culture and Quality education
          </p>
          <div className="flex justify-center md:justify-start space-x-3">
            {socialIcons.map((Icon, idx) => (
              <Icon
                key={idx}
                className="h-6 w-6 cursor-pointer text-blue-200 hover:text-yellow-400 transition-colors"
              />
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-2xl font-semibold">Quick Links</h3>
          <div className="space-y-2">
            {quickLinks.map(({ name, to }) => (
              <Link
                key={to}
                to={to}
                className="block text-lg text-blue-200 hover:text-yellow-400 transition-colors"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-2xl font-semibold">Programs</h3>
          <div className="space-y-2">
            {programs.map((program, idx) => (
              <p key={idx} className="text-lg text-blue-200">
                {program}
              </p>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-2xl font-semibold">Contact Info</h3>
          <div className="space-y-3">
            {contactInfo.map(({ icon: Icon, text }, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center md:justify-start space-x-2"
              >
                <Icon className="h-5 w-5 text-blue-200" />
                <p className="text-lg text-blue-200">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-blue-200/30 mt-4 pt-4 text-center">
        <p className="text-base text-blue-200">
          © 2025 Nepal Leadership Technology. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
