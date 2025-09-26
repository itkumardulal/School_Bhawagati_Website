import React from "react";
import { Calendar, Users, Trophy, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const navigate = useNavigate();

  const albums = [
    {
      id: "events",
      name: "School Events",
      icon: Calendar,
      description: "Various school events and celebrations",
      coverImage: "https://i.imgur.com/7n6zVdM.png",
      photoCount: 3,
    },
    {
      id: "academic",
      name: "Academic Activities",
      icon: BookOpen,
      description: "Classroom activities and educational programs",
      coverImage: "https://i.imgur.com/7zTHT2Z.jpeg",
      photoCount: 3,
    },
    {
      id: "sports",
      name: "Sports & Recreation",
      icon: Trophy,
      description: "Sports events and recreational activities",
      coverImage: "https://i.imgur.com/fn03GSq.png",
      photoCount: 1,
    },
    {
      id: "infrastructure",
      name: "Campus & Infrastructure",
      icon: Users,
      description: "School buildings and facilities",
      coverImage: "https://i.imgur.com/AYkr7dC.png",
      photoCount: 2,
    },
  ];

  const handleAlbumClick = (albumId) => {
    navigate(`/gallery?album=${albumId}`);
  };

  const handleLoadMore = () => {
    navigate("/gallery");
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 min-h-[calc(100vh-448px)]">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-800">Photo Albums</h1>
          <p className="text-gray-600 mt-2 text-xl">
            Explore our school through photos
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {albums.map((album) => {
            const AlbumIcon = album.icon;
            return (
              <div
                key={album.id}
                onClick={() => handleAlbumClick(album.id)}
                className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={album.coverImage}
                    alt={album.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/55 bg-opacity-50 flex items-center justify-center">
                    <AlbumIcon className="text-white w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
                    {album.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 mb-2">
                    {album.description}
                  </p>
                  <span className="inline-block text-xs text-blue-700 font-semibold bg-blue-100 px-3 py-1 rounded">
                    {album.photoCount} Photos
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full flex items-center justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-white font-semibold rounded-full shadow transition-all duration-200 hover:cursor-pointer hover:bg-yellow-400"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
