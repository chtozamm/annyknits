"use client";

import { useState } from "react";
import { signin } from "../actions";
import SubmitButton from "./SubmitButton";

export default function SignForm() {
  const [formError, setFormError] = useState<string>("");
  const handleSubmit = async (formData: FormData) => {
    const referrer = sessionStorage.getItem("referrer") as string;
    const res = await signin(formData, referrer);
    if (!res?.ok) {
      console.log(res);
      if (res?.error === "AuthApiError") setFormError("Wrong credentials");
      else setFormError("Couldn't sign in: try again later");
    }
  };
  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-2xs font-semibold uppercase leading-3"
        >
          email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoFocus
          required
          className="rounded-md border px-2.5 py-1.5 text-sm text-black accent-black outline-2"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-2xs font-semibold uppercase leading-3"
        >
          password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          minLength={6}
          className="rounded-md border px-2.5 py-1.5 text-sm text-black accent-black outline-2"
        />
      </div>
      {formError && <p className="text-red-600">{formError}</p>}
      <SubmitButton />
    </form>
  );
}
