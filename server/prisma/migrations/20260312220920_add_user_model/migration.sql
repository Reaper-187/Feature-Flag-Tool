-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('DEV', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,
    "user_email" VARCHAR(100) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wrong_pw_count" INTEGER NOT NULL DEFAULT 0,
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "verify_status" BOOLEAN NOT NULL DEFAULT false,
    "verify_token" TEXT,
    "verify_token_exp" TIMESTAMP(3),
    "reset_token" TEXT,
    "reset_token_exp" TIMESTAMP(3),
    "otp_code" INTEGER,
    "otp_exp" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "flags" (
    "flag_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "flag_name" VARCHAR(100) NOT NULL,
    "flag_key_name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "flag_rollout" INTEGER NOT NULL,
    "created_by" VARCHAR(100) NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flags_pkey" PRIMARY KEY ("flag_id")
);

-- CreateTable
CREATE TABLE "flag_environments" (
    "flag_id" UUID NOT NULL,
    "environment_id" INTEGER NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "flag_environments_pkey" PRIMARY KEY ("flag_id","environment_id")
);

-- CreateTable
CREATE TABLE "environments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "environments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "flags_flag_name_key" ON "flags"("flag_name");

-- CreateIndex
CREATE UNIQUE INDEX "flags_flag_key_name_key" ON "flags"("flag_key_name");

-- CreateIndex
CREATE UNIQUE INDEX "environments_name_key" ON "environments"("name");

-- AddForeignKey
ALTER TABLE "flag_environments" ADD CONSTRAINT "flag_environments_environment_id_fkey" FOREIGN KEY ("environment_id") REFERENCES "environments"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "flag_environments" ADD CONSTRAINT "flag_environments_flag_id_fkey" FOREIGN KEY ("flag_id") REFERENCES "flags"("flag_id") ON DELETE CASCADE ON UPDATE NO ACTION;
