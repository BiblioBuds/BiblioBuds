import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_EMAIL_ADDRESS,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const approvedEmail = async (name, email) => {
  try {
    const mailOptions = {
      from: `"Bibliobuds" <${process.env.GMAIL_EMAIL_ADDRESS}>`,
      to: email,
      subject: "Your order has been confirmed!",
      text: "Your order has been confirmed!",
      html: `<p>
      Dear ${name},

      Thank you for your purchase from Bibliobuds! We're pleased to confirm that your order has been received and is now being processed.

      You'll receive another email from us once your order has been shipped. If you have any questions about your order, please feel free to contact our customer service team.

      Thank you for choosing Bibliobuds!

      Best,
      Bibliobuds
      </p>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).json({ error: `Error sending email: ${err.message}` });
      } else {
        res
          .status(200)
          .json({ success: `Message delivered to ${info.accepted}` });
      }
    });
  } catch (error) {
    res.status(500).json({ error: `Error sending email: ${error}` });
  }
};

export const inProcessEmail = async (name, email) => {
  try {
    const mailOptions = {
      from: `"Bibliobuds" <${process.env.GMAIL_EMAIL_ADDRESS}>`,
      to: email,
      subject: "Your order is on its way!",
      text: "Your order is on its way!",
      html: `<p>
      Dear ${name},

      We're pleased to inform you that your order is currently in process. We're working hard to ensure that your order is prepared and shipped as quickly as possible.

      We will notify you via email once your order has been shipped. Thank you for your patience and for shopping with Bibliobuds.

      Best,
      Bibliobuds
      </p>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).json({ error: `Error sending email: ${err.message}` });
      } else {
        res
          .status(200)
          .json({ success: `Message delivered to ${info.accepted}` });
      }
    });
  } catch (error) {
    res.status(500).json({ error: `Error sending email: ${error}` });
  }
};

export const rejectedEmail = async (name, email) => {
  try {
    const mailOptions = {
      from: `"Bibliobuds" <${process.env.GMAIL_EMAIL_ADDRESS}>`,
      to: email,
      subject: "Important update about your order",
      text: "Important update about your order",
      html: `<p>
      Dear ${name},

      We regret to inform you that your order has been cancelled.

      We understand that this might be disappointing and we apologize for any inconvenience caused. You may [suggest next steps they can take, such as placing a new order, contacting customer service, etc.].

      If you have any questions or need further assistance, please don't hesitate to contact our customer service team.

      Thank you for your understanding,

      Best,
      Bibliobuds
      
      </p>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).json({ error: `Error sending email: ${err.message}` });
      } else {
        res
          .status(200)
          .json({ success: `Message delivered to ${info.accepted}` });
      }
    });
  } catch (error) {
    res.status(500).json({ error: `Error sending email: ${error}` });
  }
};

export const signUpEmail = async (name, email) => {
  try {
    const mailOptions = {
      from: `"Bibliobuds" <${process.env.GMAIL_EMAIL_ADDRESS}>`,
      to: email,
      subject: "Welcome to Bibliobuds!",
      text: "Welcome to Bibliobuds!",
      html: `<p>
      Dear ${name},

      Thank you for signing up with Bibliobuds! We're excited to have you on board and can't wait to provide you with our exceptional services.

      To get started, you might want to check out our User Help Center to learn more about how to make the most of our services. If you have any questions, don't hesitate to reach out to our support team.

      Cheers,
      Bibliobuds
      </p>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).json({ error: `Error sending email: ${err.message}` });
      } else {
        res
          .status(200)
          .json({ success: `Message delivered to ${info.accepted}` });
      }
    });
  } catch (error) {
    res.status(500).json({ error: `Error sending email: ${error}` });
  }
};

export const customEmail = async (email, text) => {
  try {
    const mailOptions = {
      from: `"Bibliobuds" <${process.env.GMAIL_EMAIL_ADDRESS}>`,
      to: process.env.GMAIL_EMAIL_ADDRESS,
      subject: `QUESTION BY ${email}`,
      text: text,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).json({ error: `Error sending email: ${err.message}` });
      } else {
        res
          .status(200)
          .json({ success: `Message delivered to ${info.accepted}` });
      }
    });
  } catch (error) {
    res.status(500).json({ error: `Error sending email: ${error}` });
  }
};
