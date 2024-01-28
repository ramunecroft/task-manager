import {GithubIcon} from "@/components/icons";
import Link from "next/link";

export const ActionPanel = () => {
  return (
    <nav className="flex items-center justify-center">
      <Link
        className="flex items-center justify-center"
        target="_blank"
        rel="noreferrer"
        href={"https://github.com/ramunecroft/task-manager"}>
        <GithubIcon />
      </Link>
    </nav>
  );
};
