import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      navigate("/home-rental");
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-red-500 text-white text-2xl">
      <p>❌ Payment Canceled. Try again!</p>
      <p className="mt-2 text-lg">Redirecting in {countdown} seconds...</p>
    </div>
  );
};

export default Cancel;
