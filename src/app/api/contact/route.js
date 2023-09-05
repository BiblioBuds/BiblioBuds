import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req, res) => {
  try {
    const newMessage = await req.json();
    const { email, phone, text } = newMessage;

    // Create a transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Set up email data with unicode symbols
    let mailOptions = {
      from: process.env.GMAIL_EMAIL_ADDRESS, // sender address
      to: process.env.GMAIL_EMAIL_ADDRESS, // list of receivers
      subject: `QUESTION BY ${email} | ${phone}`, // Subject line
      text: text, // plain text body
    };

    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Error sending email: ${error.message}` },
      { status: 500 }
    );
  }
};
