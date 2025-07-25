import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiSun,
  FiMoon,
} from "react-icons/fi";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password) {
      toast.error("Please enter the password");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        { username: name, email, password },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center px-2 sm:px-4">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 sm:p-3 rounded-full bg-white dark:bg-dark-800 shadow-lg hover:shadow-xl transition-all duration-200"
        title="Toggle theme"
      >
        {isDarkMode ? (
          <FiSun className="w-5 h-5 text-yellow-500" />
        ) : (
          <FiMoon className="w-5 h-5 text-gray-600" />
        )}
      </button>

      <div className="w-full max-w-sm sm:max-w-md flex flex-col flex-1 justify-between h-[95vh] max-h-[600px]">
        {/* Logo */}
        <div className="text-center mb-2 sm:mb-4 mt-2 sm:mt-4">
          <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-1 sm:mb-2 shadow-lg">
            <span className="text-white font-bold text-lg sm:text-xl">nI</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Create account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm">
            Join NoteIn and start organizing your thoughts
          </p>
        </div>

        {/* Signup Form */}
        <div className="card p-3 sm:p-5 flex-1 flex flex-col justify-center">
          <form onSubmit={handleSignUp} className="space-y-3 sm:space-y-4">
            {/* Name Input */}
            <div>
              <label className="input-label">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pb-4 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="input-box pl-10 py-2 text-xs sm:text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="input-label">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pb-4 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-box pl-10 py-2 text-xs sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="input-label">Password</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm py-2"
            >
              {isLoading ? (
                <div className="loading-dots">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <>
                  <span>Create Account</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-2 sm:mt-4 mb-1 sm:mb-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 NoteIn. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
