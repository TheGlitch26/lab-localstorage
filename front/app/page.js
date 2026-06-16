"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.push("/login");
      return;
    }

    setToken(storedToken);
    setLoading(false);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-zinc-500">Checking auth...</p>
      </main>
    );
  }
  
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        You are in, my friend
      </h1>

      {/* TODO: show who is logged in once you can read the token. */}
      <p className="text-zinc-500">
        Token detected ✔ You are authenticated.
      </p>

      {/* TODO: wire this button up so it clears the token and redirects to /login. */}
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full bg-black px-6 py-2 font-medium text-white transition-colors hover:bg-zinc-700"
      >
        Log out
      </button>
    </main>
  );
}
