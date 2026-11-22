import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        relative w-full flex items-center justify-center gap-2
        px-6 py-3 rounded-xl font-semibold text-base
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          pending
            ? "bg-gray-300 text-gray-500 cursor-not-allowed focus:ring-gray-300"
            : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98] focus:ring-indigo-500"
        }
      `}
    >
      {/* Spinner */}
      {pending && (
        <svg
          className="animate-spin h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}

      {/* Text */}
      <span className={pending ? "text-gray-400" : ""}>
        {pending ? "Submitting Securely" : "Submit"}
      </span>
    </button>
  );
};

export default SubmitButton;
