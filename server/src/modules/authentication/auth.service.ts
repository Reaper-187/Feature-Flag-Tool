import prisma from "../../lib/prisma";
import { UserRole } from "../../../generated/prisma/enums";
import { hashPassword } from "../../utils/hash.utils";

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
