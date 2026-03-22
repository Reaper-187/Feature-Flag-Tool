import nodemailer from "nodemailer";

interface EmailCred {
  email: string;
  token: string;
}

const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_PASS = process.env.EMAIL_PASS!;
const FRONTEND_URL = process.env.FRONTEND_URL!;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function emailService({ email, token }: EmailCred): Promise<void> {
  const verifyLink = `${FRONTEND_URL}/emailVerify?token=${token}`;

  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "E-Mail Verification",
      text: `Please verify your email: ${verifyLink}`,
      html: `
        <p>Please verify your email:</p>
        <a href="${verifyLink}">${verifyLink}</a>
      `,
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
}
