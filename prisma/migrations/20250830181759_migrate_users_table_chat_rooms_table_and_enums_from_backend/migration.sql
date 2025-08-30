-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('admin', 'guest');

-- CreateEnum
CREATE TYPE "public"."ChatPermission" AS ENUM ('all', 'admin', 'guest');

-- CreateEnum
CREATE TYPE "public"."ChatRoomType" AS ENUM ('public', 'private');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'guest';

-- CreateTable
CREATE TABLE "public"."chat_rooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."ChatRoomType" NOT NULL DEFAULT 'public',
    "permission" "public"."ChatPermission" NOT NULL DEFAULT 'all',
    "password" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "chat_rooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."chat_rooms" ADD CONSTRAINT "chat_rooms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
