import Link from "next/link";
import SignForm from "./SigninForm";

export default function Signin() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-sm">
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border bg-white px-32 py-16">
        <h1 className="mb-8 text-3xl font-semibold">Sign in</h1>
        <SignForm />
        <div className="relative flex w-full items-center justify-center">
          <div className="absolute w-full border-b" />
          <span className="relative z-10 bg-white px-4 text-3xs uppercase leading-3 text-gray-400">
            or
          </span>
        </div>
        <Link
          href="/signup"
          className="w-full rounded-md border bg-white px-4 py-2 text-center text-2xs font-semibold uppercase leading-3 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
        >
          Sign up
        </Link>
      </div>
    </main>
  );
}
