import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
      const genres = await prisma.genre.findMany({
        select:{
            genre:true
          }}
      )
      if (!genres.length) throw new Error("no genres")
      return NextResponse.json(genres)
    } catch (error) {
      return NextResponse.json({error})
    }
  }