import {usePathname} from "next/navigation";

export const useConditionFragment = () => {
  const pathname = usePathname();
  if (["/login", "/register"].includes(pathname)) return null;
};
