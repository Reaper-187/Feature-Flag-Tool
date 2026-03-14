import { UserRole } from "../../../generated/prisma/enums";
import prisma from "../../lib/prisma";

interface userAuth {
  name: string;
  email: string;
  hashPassword: string;
}

export async function registAuth({ name, email, hashPassword }: userAuth) {
  const isUserRegist = await prisma.users.findUnique({
    where: { user_email: email },
  });

  if (isUserRegist) {
    throw new Error("INVALID: User already exist");
  }

  const newUser = await prisma.users.create({
    data: {
      user_name: name,
      user_email: email,
      password_hash: hashPassword,
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
