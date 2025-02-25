import React, { useState } from "react";
import { useLocation } from "react-router";
import {loadStripe} from '@stripe/stripe-js';

const HotelDetails = () => {
  const location = useLocation();
  const hotelData = location.state?.hotelDetails;
  const hotelImage = location.state?.hotelImage; // Main image
  const hotelPhotos = location.state?.hotelPhotos?.data || []; // All photos

  const [selectedImage, setSelectedImage] = useState(null); // State for modal image

  if (!hotelData) {
    return (
      <p className="text-white text-center mt-10">Loading hotel details...</p>
    );
  }

  const { hotel_name, address, facilities_block } = hotelData.data;
  const price = hotelData?.data?.rawData?.priceBreakdown?.grossPrice?.amountRounded ||hotelData?.data?.product_price_breakdown?.all_inclusive_amount_hotel_currency?.amount_rounded ;


  //make a function for payment with stripe
  const handlePayment = async () => {
    let numericPrice = price.replace(/[^\d.]/g, ""); // Removes Rs. and commas
    numericPrice = parseFloat(numericPrice); // Convert to number
  
    console.log("Processed price:", numericPrice, "Type:", typeof numericPrice);
  
    if (isNaN(numericPrice)) {
      console.error("Invalid price after conversion:", price);
      return;
    }
  
    const response = await fetch("https://zen-rooms-hotel-booking-11.onrender.com/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotel_name,
        price: numericPrice, // Send numeric value
      }),
    });
  
    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };
  
  
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="max-w-6xl w-full mx-4 sm:mx-auto bg-gray-800 shadow-xl rounded-lg overflow-hidden my-10">
        {/* Main Hotel Image */}
        <div className="w-full">
          <img
            src={hotelPhotos[0].url}
            alt="Main Hotel"
            className="w-full h-120 object-cover cursor-pointer hover:opacity-90 transition"
            onClick={() => setSelectedImage(hotelImage)}
          />
        </div>

        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-200">{hotel_name}</h2>
          <p className="text-gray-400">{address}</p>

          {/* Price Section */}
          <p className="mt-2 text-xl font-semibold text-blue-400">
            Price: {price.toLocaleString()} / night
          </p>

          <p className="mt-4">
            <strong>Check-in:</strong> {hotelData.data.arrival_date}
          </p>
          <p>
            <strong>Check-out:</strong> {hotelData.data.departure_date}
          </p>

          <p className="mt-4 text-lg font-semibold text-yellow-400">
            ⭐ {hotelData.data.rawData.reviewScore || "N/A"} / 10
          </p>
        </div>

        {/* Gallery (Other Images) */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hotelPhotos.slice(0, 12).map((photo, index) => (
              <img
                key={index}
                src={photo.url}
                alt={`Hotel Image ${index + 1}`}
                className="w-full h-32 object-cover rounded-md cursor-pointer hover:scale-105 transition transform hover:opacity-80"
                onClick={() => setSelectedImage(photo.url)}
              />
            ))}
          </div>
        </div>

        {/* Facilities Section */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-300 mb-4">
            Facilities & Amenities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {facilities_block?.facilities?.map((facility, index) => {
              // Map facility names to corresponding emojis
              const emojiMap = {
                "Free WiFi": "📶",
                "Swimming Pool": "🏊",
                Gym: "🏋️",
                "Fitness centre": "🏋️",
                "Free parking": "🚗",
                Restaurant: "🍽️",
                "Spa and wellness centre": "💆",
                "Air conditioning": "❄️",
                Bar: "🍹",
                "Airport shuttle": "🚌",
                "Pet Friendly": "🐶",
                "24-hour Front Desk": "⏳",
                "Room service": "🛎️",
                "Family rooms": "👨‍👩‍👧‍👦",
                "Non-smoking rooms": "🚭",
                "WiFi available in all areas": "🌐",
                "Private parking": "🏎️",
              };

              // Get emoji if available, otherwise default to 🏨
              const facilityEmoji = emojiMap[facility.name] || "🏨";

              return (
                <div
                  key={index}
                  className="flex items-center bg-gray-700 p-3 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-gray-600"
                >
                  <span className="text-2xl mr-3">{facilityEmoji}</span>
                  <p className="text-gray-200">{facility.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Book Now Button */}
        <div className="p-6 flex justify-center">
          <button onClick={handlePayment} className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-md transition transform hover:scale-105">
            Book Now
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected Hotel"
              className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
            />
            <button
              className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;