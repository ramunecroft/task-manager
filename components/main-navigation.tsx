import {Icons} from "@/components/icons";
import Link from "next/link";

export const MainNavigation = () => {
  const menus = {
    Docs: "/docs",
    Task: "/task",
    Backlog: "/backlog",
  };

  return (
    <>
      <Link className="mr-6 flex items-center space-x-2" href={"/"}>
        <Icons.home />
        <span className="hidden font-bold sm:inline-block">Task Manager</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {Object.entries(menus).map(([key, value]) => (
          <Link
            key={key}
            href={`${value}`}
            className="text-foreground/60 hover:text-foreground/80 cursor-pointer transition-colors">
            {key}
          </Link>
        ))}
      </nav>
    </>
  );
};
