import {BanIcon} from "lucide-react";

export const FormError = ({message}: {message: string}) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/10 text-destructive flex items-center gap-x-2 rounded-md p-3 text-sm">
      <BanIcon />
      <p>{message}</p>
    </div>
  );
};
