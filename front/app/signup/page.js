"use client";

import { useState } from "react";
import Link from "next/link";

async function handleSubmit(e){
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:5005/signup", `{
        email: ${email},
        password: ${password}
      }`)
  }
  catch(err) {
    return err;
  }
}

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Sign up</h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:border-black"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:border-black"
          />
          <button
            type="submit"
            className="rounded-lg bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Create account
          </button>
        </form>

        {/* TODO: show a message here when the email is already taken. */}

        <p className="mt-6 text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-white underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
