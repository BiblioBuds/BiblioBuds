import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const newUser = await req.json();

    const { email, password } = newUser;

    console.log(email, password);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const storedUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ storedUser });
  } catch (error) {
    return NextResponse.json({ error });
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
