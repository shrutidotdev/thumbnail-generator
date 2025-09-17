-- CreateEnum
CREATE TYPE "public"."PlanType" AS ENUM ('FREE', 'PRO', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "public"."ImageFormat" AS ENUM ('PNG', 'JPG', 'WEBP');

-- CreateEnum
CREATE TYPE "public"."ThumbnailStatus" AS ENUM ('PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 5,
    "stripeCustomerId" TEXT,
    "subscriptionId" TEXT,
    "planType" "public"."PlanType" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."thumbnails" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "originalImageUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "format" "public"."ImageFormat" NOT NULL DEFAULT 'PNG',
    "settings" JSONB NOT NULL,
    "status" "public"."ThumbnailStatus" NOT NULL DEFAULT 'PROCESSING',
    "fileSize" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "thumbnails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."thumbnail_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "previewUrl" TEXT NOT NULL,
    "settings" JSONB NOT NULL,
    "category" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "thumbnail_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usage_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usage_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripeCustomerId_key" ON "public"."users"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "users_subscriptionId_key" ON "public"."users"("subscriptionId");

-- CreateIndex
CREATE INDEX "thumbnails_userId_idx" ON "public"."thumbnails"("userId");

-- CreateIndex
CREATE INDEX "thumbnails_status_idx" ON "public"."thumbnails"("status");

-- CreateIndex
CREATE INDEX "thumbnails_createdAt_idx" ON "public"."thumbnails"("createdAt");

-- CreateIndex
CREATE INDEX "thumbnail_templates_category_idx" ON "public"."thumbnail_templates"("category");

-- CreateIndex
CREATE INDEX "thumbnail_templates_isActive_idx" ON "public"."thumbnail_templates"("isActive");

-- CreateIndex
CREATE INDEX "usage_logs_userId_idx" ON "public"."usage_logs"("userId");

-- CreateIndex
CREATE INDEX "usage_logs_createdAt_idx" ON "public"."usage_logs"("createdAt");

-- AddForeignKey
ALTER TABLE "public"."thumbnails" ADD CONSTRAINT "thumbnails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
