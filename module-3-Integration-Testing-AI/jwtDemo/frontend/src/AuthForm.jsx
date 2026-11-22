import { useState, useActionState } from "react";
import api from "./api";
import SubmitButton from "./SubmitButton";

const AuthForm = ({ onLogin }) => {
  const [mode, setMode] = useState("login");

  const submitAction = async (prevState, formData) => {
    const username = formData.get("username")?.trim();
    const password = formData.get("password")?.trim();

    if (!username || !password) {
      return {
        error: "Username and password are required.",
        msg: "",
        username: username || "",
      };
    }

    try {
      if (mode === "register") {
        await api.post("/auth/register", { username, password });
        setMode("login");
        return {
          error: null,
          msg: "Account created! Please sign in with your credentials.",
          username,
        };
      }

      const { data } = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      onLogin(username);

      return {
        error: null,
        msg: "",
        username: data.username,
      };
    } catch (error) {
      return {
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Authentication failed. Please try again.",
        msg: "",
        username,
      };
    }
  };

  const [state, formAction, isPending] = useActionState(submitAction, {
    error: null,
    msg: "",
    username: "",
  });

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
      {/* Segmented Mode Switcher */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
        <button
          type="button"
          disabled={isPending}
          onClick={() => setMode("login")}
          className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            mode === "login"
              ? "bg-white text-slate-900 shadow-2xs"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => setMode("register")}
          className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            mode === "register"
              ? "bg-white text-slate-900 shadow-2xs"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Create Account
        </button>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          {mode === "login" ? "Welcome back" : "Join the community"}
        </h2>
        <p className="text-xs text-slate-500">
          {mode === "login"
            ? "Enter your credentials to access your account."
            : "Create a free account to start publishing posts."}
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="e.g. alex_dev"
            defaultValue={state.username}
            required
            disabled={isPending}
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white disabled:opacity-50 transition-all text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            required
            disabled={isPending}
            className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white disabled:opacity-50 transition-all text-sm"
          />
        </div>

        <div className="pt-2">
          <SubmitButton
            label={mode === "login" ? "Sign In" : "Create Account"}
            pendingLabel={
              mode === "login" ? "Signing in..." : "Creating account..."
            }
          />
        </div>

        {state.msg && (
          <div
            role="status"
            className="flex items-center gap-2 p-3 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/70 rounded-xl"
          >
            <svg
              className="w-4 h-4 shrink-0 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{state.msg}</span>
          </div>
        )}

        {state.error && (
          <div
            role="alert"
            className="flex items-center gap-2 p-3 text-xs font-medium bg-red-50 text-red-700 border border-red-200/70 rounded-xl"
          >
            <svg
              className="w-4 h-4 shrink-0 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{state.error}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
