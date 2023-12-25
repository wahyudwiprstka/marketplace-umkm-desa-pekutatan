"use client";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function login() {
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("pembeli");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !name ||
      !phonenumber ||
      !address ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Field tidak boleh kosong");
      return;
    }

    if (password != confirmPassword) {
      setError("Password & Confirm Password tidak sesuai");
      return;
    }
    setError("");

    try {
      const resEmailExists = await fetch("api/emailUsed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      console.log(resEmailExists);

      if (!resEmailExists.ok) {
        setError("Email sudah digunakan");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phonenumber,
          address,
          email,
          password,
          role,
        }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        return console.log("User registration failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg min-h-screen flex items-center justify-center">
      <form
        action="/"
        className="flex flex-col gap-4 justify-center items-center bg-white rounded-lg py-10 px-10 my-20 shadow-lg"
        method="post"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-3xl bg-clip-text text-transparent bg-gradient-to-tr from-violet-600 to-blue-600">
          Registrasi
        </h1>
        <p className="text-red-600">{error}</p>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-left text-lg text-slate-800">
            Nama
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-input border border-gray-400 px-2 py-1 rounded outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="phonenumber"
            className="text-left text-lg text-slate-800"
          >
            Nomor Handphone
          </label>
          <input
            type="text"
            name="phonenumber"
            id="phonenumber"
            className="w-input border border-gray-400 px-2 py-1 rounded outline-none"
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="address" className="text-left text-lg text-slate-800">
            Alamat
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="w-input border border-gray-400 px-2 py-1 rounded outline-none"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

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

        <div className="flex flex-col gap-1">
          <label
            htmlFor="confirmPassword"
            className="text-left text-lg text-slate-800"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="w-input border border-gray-400 px-2 py-1 rounded outline-none"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="role" className="text-left text-lg text-slate-800">
            Daftar Sebagai
          </label>
          <select
            name="role"
            id="role"
            className="outline outline-1 outline-slate-500 rounded px-2 py-1"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="pembeli">Pembeli</option>
            <option value="penjual">Penjual</option>
          </select>
        </div>

        <button className="bg-violet-600 w-full py-2 rounded-2xl text-white hover:bg-violet-800 transition-all duration-300 ease-in-out">
          Submit
        </button>
        <p>
          Sudah punya akun?{" "}
          <a href="/login" className="text-violet-600">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
