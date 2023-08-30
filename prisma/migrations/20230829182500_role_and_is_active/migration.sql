-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GUEST', 'USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "IsActive" AS ENUM ('true', 'false');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "isActive" "IsActive" NOT NULL DEFAULT 'true';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" "IsActive" NOT NULL DEFAULT 'true',
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'GUEST';
