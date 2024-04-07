DO $$ BEGIN
 CREATE TYPE "label" AS ENUM('bug', 'feature', 'enhancement', 'documentation');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "label" "label" NOT NULL;