import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // ✅ Fixed import
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // ✅ State for toggling password visibility
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://zen-rooms-hotel-booking-11.onrender.com/api/user-login",
        data,
        {
          withCredentials: true, // ✅ Allow cookies to be sent
        }
      );

      console.log(response.data);

      // ✅ Set authentication flag
      localStorage.setItem("token", "true"); // Store a token or flag
      navigate("/home-rental"); 
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-400">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              className="border rounded-md p-2 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-red-400 text-sm">{errors.email?.message}</p>
          </div>

          {/* Password Field with Show/Hide Button */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"} // ✅ Toggle between password & text
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              className="border rounded-md p-2 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
              autoComplete="current-password"
            />
            {/* Show/Hide Password Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-white"
            >
              {showPassword ? "🙈" : "👁"} {/* Eye emoji toggle */}
            </button>
            <p className="text-red-400 text-sm">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            disabled={!isDirty || !isValid}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-600"
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-400 text-center mt-4">{error}</p>}

        <p className="text-center mt-4 text-sm text-gray-300">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-400 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

