DO $$ BEGIN
 CREATE TYPE "priority" AS ENUM('lower', 'low', 'medium', 'high', 'highest');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('TO_DO', 'IN_REVIEW', 'IN_PROGRESS', 'DONE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"priority" "priority",
	"description" text NOT NULL,
	"status" "status" NOT NULL,
	"ticketCode" text NOT NULL,
	"voteCount" integer DEFAULT 0,
	"owner_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"user" "role" NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "authorId_idx" ON "tasks" ("owner_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
