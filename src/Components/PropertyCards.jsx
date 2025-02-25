import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const PropertyCards = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotels = location.state?.hotels || [];
  const arrival_date = location.state?.arrival_date;
  const departure_date = location.state?.departure_date;
  const [loadingHotelId, setLoadingHotelId] = useState(null); // Track loading for individual buttons

  if (!hotels.length) {
    return (
      <div className="text-center text-gray-400 text-lg mt-10">
        No hotels found.
      </div>
    );
  }

  const handleViewDetails = async (hotel) => {
    setLoadingHotelId(hotel.hotel_id); // Set loading state for clicked button
    try {
      // Fetch hotel details
      const detailsResponse = await axios.get("https://zen-rooms-hotel-booking-11.onrender.com/api/hotel-details", {
        params: {
          hotel_id: hotel.hotel_id,
          arrival_date,
          departure_date,
        },
      });

      // Fetch hotel photos
      const photosResponse = await axios.get("https://zen-rooms-hotel-booking-11.onrender.com/api/hotel-photos", {
        params: {
          hotel_id: hotel.hotel_id,
        },
      });

      // Navigate with hotel details
      navigate("/hotel-details", {
        state: {
          hotelDetails: detailsResponse.data,
          hotelPhotos: photosResponse.data,
          hotelImage: hotel.property.photoUrls?.[0], 
        },
      });
    } catch (error) {
      console.error("Error fetching hotel details or photos:", error.message);
      alert("Failed to fetch hotel details. Please try again.");
    } finally {
      setLoadingHotelId(null); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
        {hotels.map((hotel) => {
          const property = hotel.property || {};
          const imageUrl = property.photoUrls?.[0] || "https://via.placeholder.com/500x300";
          const name = property.name || "Unknown Property";
          const location = property.countryCode?.toUpperCase() || "Unknown Location";
          const price = property.priceBreakdown?.grossPrice?.value || "N/A";
          const rating = property.reviewScore || "N/A";
          const reviewCount = property.reviewCount || 0;

          return (
            <div
              key={hotel.hotel_id}
              className="relative bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-xl overflow-hidden shadow-md transition transform hover:scale-105 duration-300"
            >
              {/* Image Section */}
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-64 object-cover"
              />

              {/* Content Section */}
              <div className="p-5">
                <h2 className="text-xl font-medium">{name}</h2>
                <p className="text-sm text-gray-400">{location}</p>

                <div className="flex items-center justify-between mt-4">
                  {/* Price Section */}
                  <div className="text-lg font-semibold text-blue-400">{`₹${price} / night`}</div>

                  {/* Rating Section */}
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-lg">&#9733;</span>
                    <span className="ml-1 text-gray-300">
                      {rating} ({reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="p-4 bg-gray-700 text-center">
                <button
                  onClick={() => handleViewDetails(hotel)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                  disabled={loadingHotelId === hotel.hotel_id} // Disable only the clicked button
                >
                  {loadingHotelId === hotel.hotel_id ? "🔄 Loading..." : "View Details"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyCards;

