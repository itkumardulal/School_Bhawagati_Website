import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[177.77vh] h-screen -translate-x-1/2 -translate-y-1/2 sm:w-screen sm:h-[56.25vw]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/ZiEXl1lILiw?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=ZiEXl1lILiw&rel=0&disablekb=1"
            title="Bhagawati School Video"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
        {/* Overlay for darkening the video */}
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 text-center text-white max-w-4xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-yellow-300">Bhagawati School</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          A blend of Culture and Quality Education
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/admissions"
            className="h-13 px-10 py-3 inline-flex items-center justify-center rounded-md bg-yellow-400 text-black font-medium hover:bg-yellow-500 transition-colors"
          >
            Apply Now
          </Link>
          <Link
            to="/about"
            className="h-13 px-10 py-3 inline-flex items-center justify-center rounded-md border border-white bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
