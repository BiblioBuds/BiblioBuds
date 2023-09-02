import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { signUpEmail } from "../orders/notifications/[id]/emails";

export const POST = async (req, res) => {
  try {
    const newUser = await req.json();

    const { email, password } = newUser;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
      // throw new Error("Invalid email format");
    }

    // Check if user with given email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "User with this email already exists",
        },
        { status: 400 }
      );
      // throw new Error("User with this email already exists");
    }

    console.log(email, password);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const storedUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    if (storedUser) {
      await signUpEmail("User", email);
    }

    return NextResponse.json({ storedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
};

export const GET = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error });
  }
};
