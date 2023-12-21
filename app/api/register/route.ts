import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");

export async function POST(req: Request) {
  const { name, phonenumber, address, email, password, role } =
    await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  await dbConnect();

  User.create({
    name,
    phonenumber,
    address,
    email,
    password: hashedPassword,
    role,
  });

  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}
