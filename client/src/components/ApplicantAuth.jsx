import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inputVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const ApplicantAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? "http://localhost:5000/api/applicants/login"
      : "http://localhost:5000/api/applicants/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(isLogin ? "Login successful!" : "Registration successful!", {
          position: "top-center",
        });

        // Optional: save token or user info to localStorage if needed
        // localStorage.setItem("applicantToken", data.token);

        setTimeout(() => {
          navigate("/applicant");
        }, 1500);
      } else {
        toast.error(data.message || "Something went wrong!", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Server error. Please try again later.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-200 via-white to-purple-200 flex items-center justify-center">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Applicant Login" : "Applicant Registration"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <motion.input
              key="name"
              custom={0}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
          )}

          <motion.input
            key="email"
            custom={1}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />

          <motion.input
            key="password"
            custom={2}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />

          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLogin ? "Login" : "Register"}
          </motion.button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          {isLogin ? "New user?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default ApplicantAuth;
