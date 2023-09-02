import prisma from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { approvedEmail, inProcessEmail, rejectedEmail } from "./emails";

export const POST = async (req, { params }) => {
  try {
    const { id } = params;

    const { status, status_detail, metadata } = (
      await axios(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      })
    ).data;

    if (status === "approved" && status_detail === "accredited") {
      await prisma.order.update({
        where: { id: metadata.order_id },
        data: { status: "Approved" },
      });
      for (const { id, quantity } of metadata.record) {
        const product = await prisma.book.findUnique({ where: { id } });
        // const product = await Products.findByPk(id);
        const stock = product.stock - quantity;
        const updateData = {
          stock,
          isActive: stock > 0,
        };
        await prisma.book.update({
          where: { id },
          data: updateData,
        });
        // await prisma.book.update(updateData, { where: { id } });
      }
      await approvedEmail(metadata.name, metadata.email);
    } else if (status === "rejected") {
      await prisma.order.update({
        where: { id: metadata.order_id },
        data: { status: "Cancelled" },
      });
      await rejectedEmail(metadata.name, metadata.email);
    } else if (status === "in_process") {
      await inProcessEmail(metadata.name, metadata.email);
    }

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
