import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Ensure environment variables are loaded
const { EMAIL_USER, EMAIL_PASS } = process.env;

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Configure Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // Use 465 for SSL or 587 for TLS
      secure: false, // true for SSL (465), false for TLS (587)
      auth: {
        user: EMAIL_USER, // Your Gmail address
        pass: EMAIL_PASS, // App Password, NOT your real Gmail password
      },
    });

    const mailOptions = {
      from: EMAIL_USER, // Your email (Sender)
      to: "recipient@example.com", // Change this to the recipient email
      subject: `New Contact Form Submission from ${name}`,
      text: `From: ${name} (${email})\n\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
