import React, { useState, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Loader2,
} from "lucide-react";

import api from "./api";

const AuthForm = ({ onLogin }) => {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const submitAction = async (prevState, formData) => {
    const username = formData.get("username")?.trim();
    const password = formData.get("password");

    if (!username || !password?.trim()) {
      return {
        error: "Please enter both username and password.",
        msg: "",
      };
    }

    try {
      if (mode === "register") {
        await api.post("/auth/register", {
          username,
          password,
        });

        setMode("login");

        return {
          error: null,
          msg: "Account created successfully! You can now sign in.",
        };
      }

      const { data } = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username || username);

      onLogin(data.username || username);

      return {
        error: null,
        msg: "Login successful!",
      };
    } catch (error) {
      return {
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        msg: "",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(submitAction, {
    error: null,
    msg: "",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080b14] px-4 py-10 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute w-72 h-72 bg-indigo-600/20 blur-[120px] rounded-full -top-20 -left-20" />
      <div className="absolute w-72 h-72 bg-purple-600/20 blur-[120px] rounded-full -bottom-20 -right-20" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-[#111625]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="text-white" size={27} />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>

            <p className="text-gray-400 text-sm mt-3">
              {mode === "login"
                ? "Sign in to continue your journey."
                : "Join us and get started today."}
            </p>
          </div>

          {/* Form */}
          <form action={formAction} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>

              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={19}
                />

                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  required
                  disabled={isPending}
                  autoComplete="username"
                  className="w-full bg-[#0b1020] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={19}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  disabled={isPending}
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  className="w-full bg-[#0b1020] border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Feedback */}
            <AnimatePresence mode="wait">
              {(state.error || state.msg) && (
                <motion.div
                  key={state.error || state.msg}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  role={state.error ? "alert" : "status"}
                  aria-live="polite"
                  className={`rounded-xl px-4 py-3 text-sm border ${
                    state.error
                      ? "bg-red-500/10 border-red-500/20 text-red-400"
                      : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {state.error || state.msg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:shadow-indigo-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  Please wait...
                </>
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight size={19} />
                </>
              )}
            </button>
          </form>

          {/* Switch mode */}
          <div className="mt-7 text-center">
            <p className="text-sm text-gray-400">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setShowPassword(false);
                }}
                className="ml-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {/* Security footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={15} className="text-emerald-400" />
            Secure authentication · Your data stays protected
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Built for a better experience.
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
