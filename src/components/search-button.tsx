import {Button} from "@/components/ui/button";

type SearchButtonProps = {
  onClick: () => void;
};

export const SearchButton: React.FC<SearchButtonProps> = ({onClick}) => {
  return (
    <Button
      onClick={onClick()}
      className="relative inline-flex h-8 w-full items-center justify-start whitespace-nowrap rounded-[0.5rem] border border-input 
    bg-background px-4 py-2 text-sm font-normal text-muted-foreground shadow-none transition-colors 
    hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 
    focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-40 lg:w-64">
      <span className="hidden lg:inline-flex">Search documentation...</span>
      <kbd
        className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border 
      bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-sm">⌘</span>K
      </kbd>
    </Button>
  );
};
