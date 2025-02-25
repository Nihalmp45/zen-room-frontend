import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Login from "./Components/Login.jsx";
import HomeRental from "./Components/HomeRental.jsx";
import PropertyCards from "./Components/PropertyCards.jsx";
import HotelDetails from "./Components/HotelDetails.jsx";
import LandingPage from "./Components/LandingPage.jsx";
import Signup from "./Components/Signup.jsx";
import Success from "./Components/Success.jsx";
import Cancel from "./Components/Cancel.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute.jsx";
// import PublicRoute from "./Components/PublicRoute.jsx";
import NotFound from "./Components/NotFound.jsx";

const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   localStorage.getItem("isAuthenticated") === "true"
  // ); // Start as null

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       await axios.get("http://localhost:4000/api/check-auth", { withCredentials: true });
  //       setIsAuthenticated(true);
  //     } catch {
  //       setIsAuthenticated(false);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // useEffect(() => {
  //   // Sync state with localStorage when it changes
  //   localStorage.setItem("isAuthenticated", isAuthenticated);
  // }, [isAuthenticated]);

  // if (isAuthenticated === null) {
  //   return <div>Loading...</div>; // Prevent flickering
  // }

  return (
    <BrowserRouter>
      <StrictMode>
        <Routes>
          {/* Public Routes */}
          {/* <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}> */}
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                <Login
                  // setIsAuthenticated={setIsAuthenticated}
                  // isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route path="/sign-up" element={<Signup />} />
          {/* </Route> */}

          {/* Protected Routes */}
          {/* <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}> */}
            <Route
              path="/home-rental"
              element={
                <HomeRental
                  // isAuthenticated={isAuthenticated}
                  // setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route path="/properties" element={<PropertyCards />} />
            <Route path="/hotel-details" element={<HotelDetails />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          {/* </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </StrictMode>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(<App />);
