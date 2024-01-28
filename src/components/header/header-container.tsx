export const HeaderContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <header className="sticky top-0 z-50 flex w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {children}
    </header>
  );
};
