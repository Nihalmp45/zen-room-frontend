import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Success = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      navigate("/home-rental");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-500 text-white text-2xl">
      <p>✅ Payment Successful! Your booking is confirmed. 🎉</p>
      <p className="mt-2 text-lg">Redirecting in {countdown} seconds...</p>
    </div>
  );
};

export default Success;
