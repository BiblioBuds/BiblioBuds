import prisma from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req) => {
    // const claveId  = nextReq.nextUrl.searchParams.get(userId)
    // console.log('kkk')
    // console.log(claveId)
    const url = new URL(req.url)
    const id = url.search.slice(1)
    // console.log(url)
    // console.log(id)
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        }
        },
      )
      // console.log(user)
      return NextResponse.json(user)
    } catch (error) {
      return NextResponse.json({error})
    }
  }