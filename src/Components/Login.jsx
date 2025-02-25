import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state

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
    setLoading(true); // ✅ Set loading state when submitting
    setError(""); // Reset error state

    try {
      const response = await axios.post(
        "https://zen-rooms-hotel-booking-11.onrender.com/api/user-login",
        data,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      localStorage.setItem("token", "true");
      navigate("/home-rental");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false); // ✅ Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-400">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              className="border rounded-md p-2 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-white"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
            <p className="text-red-400 text-sm">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            disabled={!isDirty || !isValid || loading} // ✅ Disable when loading
            className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-600"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
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


