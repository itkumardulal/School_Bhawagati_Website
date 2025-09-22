import { useState } from "react";
import { Calendar, Users, Trophy, BookOpen, Camera, X } from "lucide-react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState("all");

  const albums = [
    {
      id: "events",
      name: "School Events",
      icon: Calendar,
      description: "Various school events and celebrations",
      coverImage:'https://i.imgur.com/7n6zVdM.png',
    },
    {
      id: "academic",
      name: "Academic Activities",
      icon: BookOpen,
      description: "Classroom activities and educational programs",
      coverImage: 'https://i.imgur.com/7zTHT2Z.jpeg',
    },
    {
      id: "sports",
      name: "Sports & Recreation",
      icon: Trophy,
      description: "Sports events and recreational activities",
      coverImage: 'https://i.imgur.com/fn03GSq.png',
    },
    {
      id: "infrastructure",
      name: "Campus & Infrastructure",
      icon: Users,
      description: "School buildings and facilities",
      coverImage: 'https://i.imgur.com/AYkr7dC.png',
    },
  ];

  const images = [
    {
      id: 1,
      src: "https://i.imgur.com/1D3sHho.jpeg",
      title: "Annual Science Fair 2024",
      description: "Students presenting their innovative science projects",
      category: "events",
      date: "March 2024",
      album: "School Events",
    },
    {
      id: 2,
      src: 'https://i.imgur.com/7zTHT2Z.jpeg',
      title: "Interactive Learning Session",
      description: "Students engaged in active learning in modern classroom",
      category: "academic",
      date: "February 2024",
      album: "Academic Activities",
    },
    {
      id: 3,
      src: 'https://i.imgur.com/AYkr7dC.png',
      title: "School Campus Overview",
      description: "Beautiful view of our modern school campus",
      category: "infrastructure",
      date: "January 2024",
      album: "Campus & Infrastructure",
    },
    {
      id: 4,
      src: 'https://i.imgur.com/1D3sHho.jpeg',
      title: "Chemistry Lab Experiment",
      description:
        "Students conducting experiments in the chemistry laboratory",
      category: "academic",
      date: "March 2024",
      album: "Academic Activities",
    },
    {
      id: 5,
      src: 'https://i.imgur.com/fn03GSq.png',
      title: "Sports Day Celebration",
      description: "Annual sports day with various athletic competitions",
      category: "sports",
      date: "February 2024",
      album: "Sports & Recreation",
    },
    {
      id: 6,
      src: 'https://i.imgur.com/7zTHT2Z.jpeg',
      title: "Computer Programming Class",
      description: "Students learning programming in our computer lab",
      category: "academic",
      date: "March 2024",
      album: "Academic Activities",
    },
    {
      id: 7,
      src:'https://i.imgur.com/7n6zVdM.png',
      title: "Cultural Festival Performance",
      description: "Students performing in the annual cultural festival",
      category: "events",
      date: "December 2023",
      album: "School Events",
    },
    {
      id: 8,
      src: 'https://i.imgur.com/7zTHT2Z.jpeg',
      title: "Library Reading Session",
      description: "Students enjoying reading in our well-equipped library",
      category: "infrastructure",
      date: "January 2024",
      album: "Campus & Infrastructure",
    },
    {
      id: 9,
      src: 'https://i.imgur.com/ZDpgTql.png',
      title: "Art & Craft Workshop",
      description: "Creative art and craft session with young artists",
      category: "events",
      date: "February 2024",
      album: "School Events",
    },
  ];

  const filteredImages =
    selectedAlbum === "all"
      ? images
      : images.filter((image) => image.category === selectedAlbum);

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-10 bg-gray-50">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4">
              Photo Gallery
            </h1>
            <p className="text-lg  sm:text-xl text-gray-600">
              Explore memorable moments from our school life through this visual
              journey.
            </p>
          </div>

          {/* Albums */}
          <section className="mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">
              Photo Albums
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {albums.map((album) => {
                const AlbumIcon = album.icon;
                return (
                  <div
                    key={album.id}
                    onClick={() => setSelectedAlbum(album.id)}
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
                        {
                          images.filter((img) => img.category === album.id)
                            .length
                        }{" "}
                        Photos
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Tabs */}
          <section>
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
              <h2 className="text-3xl  sm:text-4xl  font-bold text-blue-900">
                Photo Gallery
              </h2>
              <div className="flex flex-wrap gap-2 justify-start">
                {[
                  { id: "all", label: "All Photos" },
                  { id: "events", label: "Events" },
                  { id: "academic", label: "Academic" },
                  { id: "sports", label: "Sports" },
                  { id: "infrastructure", label: "Campus" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedAlbum(tab.id)}
                    className={`px-4 py-2 rounded-md font-semibold transition ${
                      selectedAlbum === tab.id
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-700 border border-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredImages.length > 0 ? (
                filteredImages.map((image) => (
                  <div
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        className="absolute top-3 right-3 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(image);
                        }}
                      >
                        <Camera className="w-5 h-5 text-blue-700" />
                      </button>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
                        {image.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-2">
                        {image.description}
                      </p>
                      <div className="flex justify-between text-sm text-blue-700 font-semibold">
                        <span className="bg-blue-100 px-2 py-1 rounded">
                          {image.album}
                        </span>
                        <span>{image.date}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-500">
                  <Camera className="mx-auto mb-4 w-12 h-12" />
                  No photos found in this category.
                </div>
              )}
            </div>
          </section>

          {/* Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 transition"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
                <h3 className="text-xl font-bold text-blue-900 p-4 border-b">
                  {selectedImage.title}
                </h3>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full max-h-[60vh] object-contain p-4"
                />
                <div className="px-4 pb-4 space-y-2 text-gray-700">
                  <p>{selectedImage.description}</p>
                  <div className="flex justify-between text-sm text-blue-700 font-semibold">
                    <span>{selectedImage.album}</span>
                    <span>{selectedImage.date}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
