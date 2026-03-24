import prisma from "../../lib/prisma";
import { UserRole } from "../../../generated/prisma/enums";
import { comparePassword, hashPassword } from "../../utils/hash.utils";
import { generateToken } from "../../utils/token.utils";
import { AppError } from "../../utils/appError.utils";
import crypto from "crypto";
import { emailService } from "./auth.email.service";
interface userAuth {
  name: string;
  email: string;
  password: string;
}

export async function registAuth({ name, email, password }: userAuth) {
  const isUserRegist = await prisma.users.findUnique({
    where: { user_email: email },
  });

  if (isUserRegist) {
    throw new AppError("Invalid email or password", 409);
  }

  const hashedPassword = await hashPassword(password);

  const rawToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 Stunden gültig

  const newUser = await prisma.users.create({
    data: {
      user_name: name,
      user_email: email,
      password_hash: hashedPassword,
      role: UserRole.DEV,
      verify_token: hashedToken,
      verify_token_exp: tokenExpires,
    },
    select: {
      user_id: true,
      user_name: true,
      user_email: true,
      role: true,
      created_at: true,
    },
  });

  await emailService({
    email,
    token: rawToken,
    type: "VERIFY_EMAIL",
  });

  return newUser;
}

export async function emailVerify(token: string) {
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  const checkToken = await prisma.users.findFirst({
    where: {
      verify_token: {
        equals: hashToken,
      },
      verify_token_exp: {
        gt: new Date(),
      },
    },
  });

  if (!checkToken) {
    throw new AppError("Token is wrong or expired.", 400);
  }

  const updateAccount = await prisma.users.update({
    where: {
      user_id: checkToken.user_id,
    },
    data: {
      verify_status: true,
      verify_token: null,
      verify_token_exp: null,
    },
  });

  if (!updateAccount) {
    throw new AppError("Server-Error", 400);
  }
  return { success: true };
}

export async function loginAuth(email: string, password: string) {
  const findUsersCred = await prisma.users.findUnique({
    where: { user_email: email },
  });

  if (!findUsersCred) {
    throw new AppError("Invalid email or password", 401);
  }

  const checkUserPwInput = await comparePassword(
    password,
    findUsersCred.password_hash,
  );

  if (!checkUserPwInput) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!findUsersCred.verify_status) {
    throw new AppError("Invalid email or password", 401);
  }
  const { password_hash, reset_token, reset_token_exp, ...safeUser } =
    findUsersCred;

  const token = generateToken(safeUser.user_id);

  return {
    user: safeUser,
    token,
  };
}

export async function resendEmail(email: string) {
  const findUsersCred = await prisma.users.findUnique({
    where: { user_email: email },
  });

  if (!findUsersCred || findUsersCred.verify_status) return;

  if (
    findUsersCred.verify_token_exp &&
    findUsersCred.verify_token_exp > new Date()
  ) {
    return;
  }

  const rawToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await prisma.users.update({
    where: {
      user_id: findUsersCred.user_id,
    },
    data: {
      verify_token: hashedToken,
      verify_token_exp: tokenExpires,
    },
  });

  await emailService({
    email: findUsersCred.user_email,
    token: rawToken,
    type: "VERIFY_EMAIL",
  });

  return {
    success: true,
  };
}

export async function requestPasswordReset(email: string) {
  const user = await prisma.users.findUnique({
    where: { user_email: email },
  });

  if (!user) return;

  if (user.reset_token_exp && user.reset_token_exp > new Date()) {
    return;
  }

  const rawToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const tokenExpires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.users.update({
    where: {
      user_id: user.user_id,
    },
    data: {
      reset_token: hashedToken,
      reset_token_exp: tokenExpires,
    },
  });

  await emailService({
    email: user.user_email,
    token: rawToken,
    type: "RESET_PASSWORD",
  });
}

export async function resetPassword(password: string, token: string) {
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  const userToken = await prisma.users.findFirst({
    where: {
      reset_token: {
        equals: hashToken,
      },
      reset_token_exp: {
        gt: new Date(),
      },
    },
  });

  if (!userToken) {
    throw new AppError("Token is wrong or expired.", 400);
  }

  const hashedNewPassword = await hashPassword(password);

  await prisma.users.update({
    where: { user_id: userToken.user_id },
    data: {
      password_hash: hashedNewPassword,
      reset_token: null,
      reset_token_exp: null,
      wrong_pw_count: 0,
      blocked: false,
    },
  });
}
