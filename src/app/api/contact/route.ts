import { NextRequest, NextResponse } from "next/server";
import { saveMessage, getMessages } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON format in request body." },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    // Strict Validations
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address (e.g. name@example.com)." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please enter a message (at least 5 characters)." },
        { status: 400 }
      );
    }

    // Capture client IP
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "localhost";

    // 1. Save to Database (Stored for Inbox at /inbox)
    let savedMessage;
    try {
      savedMessage = await saveMessage({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        ip,
      });
    } catch (dbErr) {
      console.error("Database storage error:", dbErr);
      return NextResponse.json(
        { success: false, error: "Failed to store message. Please try again." },
        { status: 500 }
      );
    }

    // 2. Email Delivery Notification (Non-blocking safe execution)
    let emailSent = false;
    const recipientEmail = process.env.RECIPIENT_EMAIL || "muhammadkamran0774@gmail.com";
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    // Option A: Direct Gmail SMTP via Nodemailer
    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: 465,
          secure: true,
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${emailUser}>`,
          to: recipientEmail,
          replyTo: email.trim(),
          subject: `⚡ New Message from ${name.trim()} via Portfolio`,
          text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nDate: ${new Date().toLocaleString()}\n\nMessage:\n${message.trim()}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #09090b; color: #ffffff;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #121215; border: 1px solid #27272a; border-radius: 12px; padding: 25px;">
                <h2 style="color: #f59e0b; margin-top: 0;">New Message from ${name.trim()}</h2>
                <p style="color: #a1a1aa; font-size: 14px;">Received on: ${new Date().toLocaleString()}</p>
                <hr style="border: 0; border-top: 1px solid #27272a; margin: 20px 0;" />
                <p><strong>Sender Name:</strong> ${name.trim()}</p>
                <p><strong>Sender Email:</strong> <a href="mailto:${email.trim()}" style="color: #f59e0b;">${email.trim()}</a></p>
                <div style="margin-top: 20px; padding: 15px; background-color: #18181b; border-radius: 8px; border-left: 3px solid #f59e0b;">
                  <p style="white-space: pre-wrap; margin: 0; color: #e4e4e7;">${message.trim()}</p>
                </div>
              </div>
            </div>
          `,
        });
        emailSent = true;
      } catch (smtpErr) {
        console.warn("Direct SMTP notification encountered an issue:", smtpErr);
      }
    }

    // Option B: Webhook Relay fallback to recipientEmail
    if (!emailSent) {
      try {
        const origin = req.headers.get("origin") || req.headers.get("referer") || "http://localhost:3000";
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

        const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Referer": origin,
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            _subject: `New Portfolio Message from ${name.trim()}`,
            _template: "table",
          }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const formSubmitData = await formSubmitRes.json();
        if (formSubmitData.success === "true" || formSubmitData.success === true) {
          emailSent = true;
        }
      } catch (fErr) {
        console.warn("Webhook relay notification note:", fErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully and saved to the database!",
        data: {
          id: savedMessage.id,
          createdAt: savedMessage.createdAt,
          emailSent,
          recipient: recipientEmail,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await getMessages();
    return NextResponse.json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error("Error reading messages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
