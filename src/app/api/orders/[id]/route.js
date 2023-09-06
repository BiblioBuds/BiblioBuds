import prisma from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: id,
      },
      include: {
        details: {
          include: {
            book: {
              include: {
                editorial: {
                  select: {
                    editorial: true,
                  },
                },
                bookGenres: {
                  select: {
                    genre: true,
                  },
                },
                bookFormats: {
                  select: {
                    format: true,
                  },
                },
                bookLanguages: {
                  select: {
                    language: true,
                  },
                },
              },
            },
          },
        },
        user: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error });
  }
};

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const { userId } = await req.json();

    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
    });

    if (!order || order.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" });
    }

    if (order.status === "Approved") {
      return NextResponse.json({
        error: "It is not possible to cancel an approved order.",
      });
    }

    const storedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: { status: "Cancelled" },
    });

    return NextResponse.json({ storedOrder });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
