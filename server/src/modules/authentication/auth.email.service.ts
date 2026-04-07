import nodemailer from "nodemailer";

type EmailType = "VERIFY_EMAIL" | "RESET_PASSWORD";

interface EmailPayload {
  email: string;
  token: string;
  type: EmailType;
}

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const FRONTEND_URL = process.env.FRONTEND_URL;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function emailService({
  email,
  token,
  type,
}: EmailPayload): Promise<void> {
  let subject: string;
  let link: string;
  let html: string;
  let text: string;

  switch (type) {
    case "VERIFY_EMAIL":
      link = `${FRONTEND_URL}/verify-email/confirm?token=${token}`;
      subject = "E-Mail Verification";

      text = `Please verify your email: ${link}`;
      html = `
        <p>Please verify your email:</p>
        <a href="${link}">${link}</a>
      `;
      break;

    case "RESET_PASSWORD":
      link = `${FRONTEND_URL}/reset-password?token=${token}`;
      subject = "Password Reset";

      text = `Reset your password: ${link}`;
      html = `
        <p>You requested a password reset:</p>
        <a href="${link}">${link}</a>
        <p>This link is valid for a limited time.</p>
      `;
      break;

    default:
      throw new Error("Invalid email type");
  }

  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("Email send failed:", error);
    throw new Error("Email could not be sent");
  }
}
