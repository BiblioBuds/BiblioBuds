import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    try {
      const languages = await prisma.language.findMany({
        select:{
            language:true
          }}
      )
      if (!languages.length) throw new Error("no languages")
      return NextResponse.json(languages)
    } catch (error) {
      return NextResponse.json({error})
    }
  }