"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setRequestMeta } from "next/dist/server/request-meta";



export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5005/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          })
    });

      const data = await response.json();

      if(response.ok){
        console.log("Success");
        setSuccess(data.message);
        setError("");
        setEmail("");
        setPassword("");
        alert(data.message);
        router.push("/login");
      }
      else {
        setError(data.message);
        setSuccess("");
      }
  }
  catch(error) {
    setError(error.message);
  }
}

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Sign up</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        {error && (<p className="text-red-500">{error}</p>)}
        {success && <p className="text-green-500">{success}</p>}


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
