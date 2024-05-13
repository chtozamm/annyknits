"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="mt-8 rounded-md border bg-white px-4 py-2 text-2xs font-semibold uppercase leading-3 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black disabled:text-gray-400"
    >
      <span className="relative">
        <svg
          className={`${!pending && "hidden"} absolute -left-4 h-3 w-3 animate-spin`}
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
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Sign in
      </span>
    </button>
  );
}
