import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";

const HomeRental = () => {
  const [formData, setFormData] = useState({
    destination: "",
    arrival: null,
    departure: null,
    adults: "",
    children: "",
    rooms: "",
  });
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSearch = async () => {
    setLoading(true);
    const { destination, arrival, departure, adults, children, rooms } =
      formData;

    const formattedArrivalDate = arrival
      ? arrival.toISOString().split("T")[0]
      : "";
    const formattedDepartureDate = departure
      ? departure.toISOString().split("T")[0]
      : "";

    const queryParams = {
      query: destination,
      arrival_date: formattedArrivalDate,
      departure_date: formattedDepartureDate,
      adults,
      children_age: children,
      room_qty: rooms,
    };

    const queryString = new URLSearchParams(queryParams).toString();

    try {
      const response = await fetch(
        `https://zen-rooms-hotel-booking-11.onrender.com/api/get-properties?${queryString}`,
        { method: "GET" }
      );

      if (response.ok) {
        const data = await response.json();
        setHotels(data.data.hotels);

        navigate("/properties", {
          state: {
            hotels: data.data.hotels || [],
            arrival_date: formattedArrivalDate,
            departure_date: formattedDepartureDate,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://zen-rooms-hotel-booking-9.onrender.com/api/logout",
        {
          method: "GET",
        }
      );

      if (response.ok) {
        console.log("User logged out successfully");
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
      } else {
        console.error("Logout failed", await response.text());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className=" text-white p-4 shadow-lg fixed top-0 left-0 w-full z-10 box-border">
        <div className="absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-6 py-2 rounded-full transition duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-start text-white pt-20 overflow-x-hidden bg-home-rental">
        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-4xl">
          <h1 className="text-4xl font-extrabold text-center mb-6 text-white">
            🏨 Find Your Perfect Stay
          </h1>
          {/* Form Section with Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top Row (3 Inputs) */}
            <div className="w-full">
              <input
                type="text"
                name="destination"
                placeholder="🌍 Destination"
                value={formData.destination}
                onChange={handleChange}
                className="p-3 rounded-lg w-full border border-gray-600 placeholder-gray-400 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="w-full">
              <DatePicker
                selected={formData.arrival}
                onChange={(date) => handleDateChange(date, "arrival")}
                placeholderText="📅 Arrival Date"
                dateFormat="dd/MM/yyyy"
                calendarClassName="custom-calendar"
                minDate={new Date()} // ✅ Restrict to future dates only
                className="p-3 w-68 rounded-lg border border-gray-600 placeholder-gray-400 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="w-full">
              <DatePicker
                selected={formData.departure}
                onChange={(date) => handleDateChange(date, "departure")}
                placeholderText="📆 Departure Date"
                dateFormat="dd/MM/yyyy"
                calendarClassName="custom-calendar"
                minDate={formData.arrival || new Date()} // ✅ Restrict to arrival date or future
                className="p-3 rounded-lg w-68 border border-gray-600 placeholder-gray-400 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Bottom Row (3 Inputs) */}
            <div className="w-full">
              <input
                type="number"
                name="adults"
                placeholder="👨‍👩‍👧 Adults"
                min={1}
                value={formData.adults}
                onChange={handleChange}
                className="p-3 rounded-lg w-full border border-gray-600 placeholder-gray-400 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="w-full">
              <input
                type="number"
                name="children"
                placeholder="🧒 Children"
                min={0}
                value={formData.children}
                onChange={handleChange}
                className="p-3 rounded-lg w-full border border-gray-600 placeholder-gray-400 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="w-full">
              <input
                type="number"
                name="rooms"
                placeholder="🚪 Rooms"
                min={1}
                value={formData.rooms}
                onChange={handleChange}
                className="p-3 rounded-lg w-full border border-gray-600 placeholder-gray-400 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center text-lg transition duration-300"
            disabled={loading}
          >
            {loading ? "🔄 Searching..." : "🔍 Search Hotels"}
          </button>
        </div>

        {/* <div className="relative z-10 mt-16">
          <RollingGallery autoplay={true} pauseOnHover={true} />
        </div> */}

        {/* Superb Quotes Section */}
        <div className="mt-12 max-w-4xl w-full text-center text-white px-6 mb-8">
          <blockquote className="text-xl italic mb-8">
            "India is not just a country, it’s a way of life." – Raghav Mehra
          </blockquote>
          <blockquote className="text-xl italic mb-8">
            "India’s beauty is in its diversity, history, culture, and its
            people. Traveling here is an adventure for the soul." – Priya Desai
          </blockquote>
          <blockquote className="text-xl italic">
            "To travel is to live, and India is the ultimate journey for the
            spirit." – Vikram Singh
          </blockquote>
        </div>
      </div>
    </>
  );
};

export default HomeRental;
