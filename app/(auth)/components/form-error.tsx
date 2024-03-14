import {BanIcon} from "lucide-react";

export const FormError = ({message}: {message: string}) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
      <BanIcon />
      <p>{message}</p>
    </div>
  );
};
