ALTER TABLE "tasks" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "ticketCode" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "voteCount" SET DEFAULT 0;