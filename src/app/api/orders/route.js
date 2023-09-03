import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export const GET = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
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

export const POST = async (req, res) => {
  try {
    const newOrder = await req.json();

    const { products, userId } = newOrder;

    const client = await prisma.user.findUnique({ where: { id: userId } });

    if (!client) {
      throw new Error("There are no users with this id.");
    }

    let productIds = [];
    let record = [];
    let total = 0;

    let items = products.map((product) => {
      const { id, title, author, image, price, quantity } = product;
      productIds.push(id);
      record.push({ id, quantity });
      total += price * quantity;
      return {
        id,
        title,
        quantity,
        unit_price: Number(price),
        currency_id: "ARS",
        picture_url: image,
        description: `${title} - ${author}`,
      };
    });

    const inactives = await prisma.book.findMany({
      where: { id: { in: productIds }, isActive: false },
    });

    if (inactives.length > 0) {
      const bookNames = inactives.map((e) => e.title);
      throw new Error(
        `Sorry, the books ${bookNames.join(", ")} are not available`
      );
    }

    const order = await prisma.order.create({
      data: {
        status: "Pending",
        totalPrice: total,
        user: { connect: { id: client.id } },
      },
    });

    let preference = {
      items,
      back_urls: {
        success: "https://biblio-buds-git-dev-bibliobuds.vercel.app/",
        failure: "https://biblio-buds-git-dev-bibliobuds.vercel.app/",
        pending: "https://biblio-buds-git-dev-bibliobuds.vercel.app/",
      },
      notification_url:
        "https://biblio-buds-git-dev-bibliobuds.vercel.app/api/orders/webhook",
      metadata: {
        name: client.email,
        email: client.email,
        record,
        orderId: order.id,
      },
    };

    for (let data of products) {
      const { id, price, quantity } = data;
      const product = await prisma.book.findUnique({ where: { id } });
      const detail = await prisma.detail.create({
        data: {
          quantity,
          unitPrice: price,
          book: { connect: { id: product.id } },
          order: { connect: { id: order.id } },
        },
      });
    }

    const response = await mercadopago.preferences.create(preference);

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
