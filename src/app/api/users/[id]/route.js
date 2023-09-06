import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
    try {
      const { id } = params;
      const { isActive, role} = await req.json();
  
      console.log(isActive)
      console.log(role)
      
      if (isActive !== undefined) {
        await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            isActive: isActive,
          },
        })
      }
      if (role !== undefined) {
        await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            role: role,
          },
        })
      }


    return NextResponse.json({message: "user updated"});
    } catch (error) {
    return NextResponse.json({ error });
  }
};