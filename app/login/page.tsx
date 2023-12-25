"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email atau password tidak boleh kosong");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email atau password salah");
        return;
      }

      router.replace("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg min-h-screen flex items-center justify-center">
      <form
        action="login"
        className="flex flex-col gap-4 justify-center items-center bg-white rounded-lg py-20 px-10 shadow-lg transition-all duration-200 ease-out hover:shadow-2xl"
        method="post"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-3xl bg-gradient-to-tr bg-clip-text text-transparent from-violet-600 to-fuchsia-800">
          LOGIN
        </h1>
        <p className="text-red-600">{error}</p>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-left text-lg text-slate-800">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-input border border-gray-400 px-2 py-1 rounded outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-left text-lg text-slate-800"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-input border border-gray-400 px-2 py-1 rounded outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-violet-600 w-full py-2 rounded-2xl text-white hover:bg-violet-800 transition-all duration-300 ease-in-out">
          Submit
        </button>
        <p>
          Belum punya akun?{" "}
          <a href="/register" className="text-violet-600">
            Buat akun
          </a>
        </p>
      </form>
    </div>
  );
}
