import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Fixed import

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      type: "user", // Ensure type is always "user"
      address: "",
    },
    mode: "onBlur",
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://zen-rooms-hotel-booking-11.onrender.com/api/user", data);
      console.log(response.data);
      navigate("/home-rental");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-400">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { label: "Name", id: "name", type: "text", validation: { required: "Username is necessary", minLength: { value: 3, message: "Username must be at least 3 characters" } } },
            { label: "Email", id: "email", type: "email", validation: { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" } } },
            { label: "Phone", id: "phone", type: "number", validation: { required: "Primary phone number is required", pattern: { value: /^\d{10}$/, message: "Phone number must be exactly 10 digits" } } },
            { label: "Address", id: "address", type: "text", validation: { minLength: { value: 10, message: "Address must be at least 10 characters if provided" } } },
          ].map(({ label, id, type, validation }) => (
            <div key={id} className="flex flex-col">
              <label htmlFor={id} className="text-sm font-medium text-gray-300">{label}</label>
              <input
                type={type}
                id={id}
                {...register(id, validation)}
                className="border rounded-md p-2 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <p className="text-red-400 text-sm">{errors[id]?.message}</p>
            </div>
          ))}

          {/* Password Field with Toggle Visibility */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", { required: "Password is necessary", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
              className="border rounded-md p-2 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-white"
            >
              {showPassword ? "🙈" : "👁"} {/* Emoji for eye icon */}
            </button>
            <p className="text-red-400 text-sm">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            disabled={!isDirty || !isValid}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-600"
          >
            Submit
          </button>
        </form>

        {error && <p className="text-red-400 text-center mt-4">{error}</p>}

        <p className="text-center mt-4 text-sm text-gray-300">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Log in</Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;

