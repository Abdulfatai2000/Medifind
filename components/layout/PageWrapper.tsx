import * as React from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PageWrapper({ children, className, ...props }: PageWrapperProps) {
  return (
    <div
      className={cn("container mx-auto px-4 md:px-6 py-6 md:py-8 lg:py-10 max-w-7xl flex flex-col flex-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}
