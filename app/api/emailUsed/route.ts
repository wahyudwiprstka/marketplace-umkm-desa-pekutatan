import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email can be used" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "" }, { status: 404 });
    }
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
