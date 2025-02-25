import React from "react";
import { Link } from "react-router-dom"; // Ensure correct import
import RollingGallery from "../Helpers/RollingGallery";
import CircularGallery from "../Helpers/CircularGallery";
import SpotlightCard from "../Helpers/SpotlightCard";
import Stack from "../Helpers/Stack";

const LandingPage = () => {
  const features = [
    {
      title: "Handpicked Stays for Every Traveler",
      description:
        "🏨 Curated Hotels & Stays\nFind comfortable, affordable, and luxurious stays, carefully selected for your perfect trip!",
      icon: "🏨",
    },
    {
      title: "Seamless Booking Experience",
      description:
        "📅 Easy & Secure Reservations\nBook your stay effortlessly with a smooth, user-friendly booking system and secure payments.",
      icon: "📅",
    },
    {
      title: "Unmatched Comfort & Service",
      description:
        "🌟 Premium Amenities & Support\nEnjoy cozy rooms, top-notch facilities, and 24/7 customer support for a hassle-free experience.",
      icon: "🌟",
    },
  ];

  const images = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white w-screen overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white py-4 px-6 flex flex-wrap items-center justify-between shadow-lg">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/Images/zen Rooms.png"
            alt="Zen Rooms"
            className="h-14 w-auto"
          />
        </div>

        {/* Auth Buttons - Auto Stack on Small Screens */}
        <div className="flex space-x-4">
          <Link to="/sign-up">
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-4 py-2 rounded-full transition duration-300 text-sm md:text-base">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-4 py-2 rounded-full transition duration-300 text-sm md:text-base">
              Login
            </button>
          </Link>
        </div>
      </nav>

      <div className="w-full overflow-x-hidden">
        <RollingGallery autoplay={true} pauseOnHover={true} />
      </div>

      <div className="bg-gray-900 text-white pt-12 px-6 pb-12">
        <h2 className="text-4xl font-bold text-center mb-8">
          Why Choose Zen Rooms?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card p-6 rounded-lg shadow-md text-center bg-gray-800"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div className="text-5xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-300 mt-2 whitespace-pre-line">
                {feature.description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Explore Hotels Section */}
      <div className="text-center pt-8 px-4">
        <h2 className="text-4xl font-bold">Explore Our Exclusive Hotels</h2>
        <p className="text-lg text-gray-300 mt-4">
          Discover luxury stays, cozy retreats, and budget-friendly options
          tailored for your perfect getaway.
        </p>
      </div>

      <div
        style={{ height: "600px", position: "relative", overflowX: "hidden" }}
      >
        <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
      </div>

      {/* Why Choose Us Section */}
      

      {/* Rolling Gallery */}
     

      {/* Start Your Journey Section */}
      <div className="bg-gray-900 text-white py-8 px-6 text-center mt-6">
        <h2 className="text-4xl font-bold">Start Your Journey with Us</h2>
        <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
          Whether you're looking for luxury, budget-friendly stays, or hidden
          gems, Zen Rooms helps you find the perfect place to stay. Enjoy a
          seamless booking experience and unmatched comfort.
        </p>
        <Link to="/sign-up">
          <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition duration-300">
            Explore Stays
          </button>
        </Link>
      </div>

      {/* Stack Component - Centered */}
      <div className="flex flex-col items-center justify-center py-6">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          🖐️ Hold & Drag Me Away 👇
        </h1>
        <Stack
          randomRotation={true}
          sensitivity={180}
          sendToBackOnClick={false}
          cardDimensions={{ width: 200, height: 200 }}
          cardsData={images}
        />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-gray-400 text-sm">
            © 2025 Nihal MP | 📧{" "}
            <a
              href="mailto:nihalmp45@gmail.com"
              className="hover:text-gray-300"
            >
              nihalmp45@gmail.com
            </a>
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <a
              href="https://www.instagram.com/nihalmp__45/?next=%2F"
              className="navbar--content"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 33 33"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.0001 4.65479H11.3334C7.65152 4.65479 4.66675 7.63956 4.66675 11.3215V21.9881C4.66675 25.67 7.65152 28.6548 11.3334 28.6548H22.0001C25.6819 28.6548 28.6667 25.67 28.6667 21.9881V11.3215C28.6667 7.63956 25.6819 4.65479 22.0001 4.65479ZM26.3334 21.9881C26.3261 24.3783 24.3902 26.3141 22.0001 26.3215H11.3334C8.94321 26.3141 7.0074 24.3783 7.00008 21.9881V11.3215C7.0074 8.93125 8.94321 6.99544 11.3334 6.98812H22.0001C24.3902 6.99544 26.3261 8.93125 26.3334 11.3215V21.9881ZM23.0001 11.6548C23.7365 11.6548 24.3334 11.0578 24.3334 10.3215C24.3334 9.58508 23.7365 8.98812 23.0001 8.98812C22.2637 8.98812 21.6667 9.58508 21.6667 10.3215C21.6667 11.0578 22.2637 11.6548 23.0001 11.6548ZM16.6667 10.6548C13.353 10.6548 10.6667 13.3411 10.6667 16.6548C10.6667 19.9685 13.353 22.6548 16.6667 22.6548C19.9805 22.6548 22.6667 19.9685 22.6667 16.6548C22.6703 15.0624 22.0393 13.5342 20.9133 12.4082C19.7873 11.2822 18.2591 10.6512 16.6667 10.6548ZM13.0001 16.6548C13.0001 18.6799 14.6417 20.3215 16.6667 20.3215C18.6918 20.3215 20.3334 18.6799 20.3334 16.6548C20.3334 14.6297 18.6918 12.9881 16.6667 12.9881C14.6417 12.9881 13.0001 14.6297 13.0001 16.6548Z"
                  fill="url(#instagram-gradient)"
                />
                <defs>
                  <linearGradient
                    id="instagram-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#feda75" />
                    <stop offset="25%" stopColor="#fa7e1e" />
                    <stop offset="50%" stopColor="#d62976" />
                    <stop offset="75%" stopColor="#962fbf" />
                    <stop offset="100%" stopColor="#4f5bd5" />
                  </linearGradient>
                </defs>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/nihal-abdul-khader-4362b132a"
              className="navbar--content"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 33 33"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.33341 4.65479H26.0001C27.4729 4.65479 28.6667 5.84869 28.6667 7.32145V25.9881C28.6667 27.4609 27.4729 28.6548 26.0001 28.6548H7.33341C5.86065 28.6548 4.66675 27.4609 4.66675 25.9881V7.32145C4.66675 5.84869 5.86065 4.65479 7.33341 4.65479ZM11.3334 24.6548C11.7016 24.6548 12.0001 24.3563 12.0001 23.9881V14.6548C12.0001 14.2867 11.7016 13.9881 11.3334 13.9881H9.33342C8.96523 13.9881 8.66675 14.2867 8.66675 14.6548V23.9881C8.66675 24.3563 8.96523 24.6548 9.33342 24.6548H11.3334ZM10.3334 12.6548C9.22884 12.6548 8.33341 11.7594 8.33341 10.6548C8.33341 9.55021 9.22884 8.65479 10.3334 8.65479C11.438 8.65479 12.3334 9.55021 12.3334 10.6548C12.3334 11.7594 11.438 12.6548 10.3334 12.6548ZM24.0001 24.6548C24.3682 24.6548 24.6667 24.3563 24.6667 23.9881V17.8548C24.7101 15.7359 23.1435 13.9275 21.0401 13.6681C19.5694 13.5338 18.1445 14.2207 17.3334 15.4548V14.6548C17.3334 14.2867 17.0349 13.9881 16.6667 13.9881H14.6667C14.2986 13.9881 14.0001 14.2867 14.0001 14.6548V23.9881C14.0001 24.3563 14.2986 24.6548 14.6667 24.6548H16.6667C17.0349 24.6548 17.3334 24.3563 17.3334 23.9881V18.9881C17.3334 17.8836 18.2289 16.9881 19.3334 16.9881C20.4379 16.9881 21.3334 17.8836 21.3334 18.9881V23.9881C21.3334 24.3563 21.6319 24.6548 22.0001 24.6548H24.0001Z"
                  fill="#0077b5"
                />
              </svg>
            </a>

            {/* GitHub */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
