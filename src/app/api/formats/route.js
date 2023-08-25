import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
      const formats = await prisma.format.findMany({
        select:{
            format:true
          }}
      )
      if (!formats.length) throw new Error("no formats")
      return NextResponse.json(formats)
    } catch (error) {
      return NextResponse.json({error})
    }
  }