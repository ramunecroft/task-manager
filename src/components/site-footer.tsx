import {cn} from "@/lib/utils";

export function SiteFooter({className}: React.HTMLAttributes<HTMLElement>) {
  console.log(className);
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10">
        hello
      </div>
    </footer>
  );
}
