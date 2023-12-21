"use client";

import { FormEvent, useState } from "react";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email atau password tidak boleh kosong");
      return;
    }
  };

  return (
    <div className="bg min-h-screen flex items-center justify-center">
      <form
        action="login"
        className="flex flex-col gap-4 justify-center items-center bg-white rounded-lg py-20 px-10 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-2xl">Login</h1>
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
          <a href="#" className="text-violet-600">
            Buat akun
          </a>
        </p>
      </form>
    </div>
  );
}
