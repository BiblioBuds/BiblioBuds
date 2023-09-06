import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
    try {
      const { id } = params;
      const  updatedBook = await req.json();
      // console.log(id)
      // console.log(updatedBook.price)
      // console.log(updatedBook.stock)

      await prisma.book.update({
        where: {
          id: parseInt(id)
        },
        data: {
          price: parseFloat(updatedBook.price),
          stock: parseInt(updatedBook.stock)
        },
      })

    return NextResponse.json({message: "user updated"});
    } catch (error) {
    return NextResponse.json({ error });
  }
};