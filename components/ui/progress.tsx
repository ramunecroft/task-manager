"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";
import {cn} from "@/lib/utils";
import {progressTriggeredAtom} from "@/store";
import {useAtom} from "jotai";
import {usePathname} from "next/navigation";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({className, ...props}, ref) => {
  const pathname = usePathname();
  const [translateX, setTranslateX] = React.useState(0);
  const [progressTriggered, setProgressTriggered] = useAtom(progressTriggeredAtom);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX(prevValue => {
        if (prevValue >= 100) {
          clearInterval(interval);
          return 100;
        } else if (prevValue >= 5) {
          return 100;
        } else {
          return prevValue + Math.ceil(Math.random() * 3);
        }
      });
    }, 100);

    return () => {
      clearInterval(interval);
      setProgressTriggered(false);
      setTranslateX(0);
    };
  }, [progressTriggered, pathname]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative h-2 w-full overflow-hidden bg-secondary", className)}
      {...props}>
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{transform: `translateX(-${100 - (translateX || 0)}%)`}}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export {Progress};
