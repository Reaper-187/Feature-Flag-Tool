import prisma from "../../lib/prisma";
import { UserRole } from "../../../generated/prisma/enums";
import { comparePassword, hashPassword } from "../../utils/hash.utils";
import { generateToken } from "../../utils/token.utils";

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
    throw new Error("INVALID: User already exist");
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await prisma.users.create({
    data: {
      user_name: name,
      user_email: email,
      password_hash: hashedPassword,
      role: UserRole.DEV,
    },
    select: {
      user_id: true,
      user_name: true,
      user_email: true,
      role: true,
      created_at: true,
    },
  });

  return newUser;
}

export async function loginAuth(email: string, password: string) {
  const findUsersCred = await prisma.users.findUnique({
    where: { user_email: email },
  });

  if (!findUsersCred) {
    throw new Error("Invalid email or password");
  }

  const checkUserPwInput = await comparePassword(
    password,
    findUsersCred.password_hash,
  );

  if (!checkUserPwInput) {
    throw new Error("Invalid email or password");
  }

  const {
    password_hash,
    reset_token,
    reset_token_exp,
    otp_code,
    otp_exp,
    ...safeUser
  } = findUsersCred;

  const token = generateToken(safeUser.user_id);

  return {
    user: safeUser,
    token,
  };
}
