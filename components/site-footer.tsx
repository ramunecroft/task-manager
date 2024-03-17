"use client";

import {useConditionFragment} from "@/hooks/use-condition-fragment";
import {cn} from "@/lib/utils";

export function SiteFooter({className}: React.HTMLAttributes<HTMLElement>) {
  if (useConditionFragment() === null) return null;

  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10">
        hello
      </div>
    </footer>
  );
}
