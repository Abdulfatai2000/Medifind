import { FileX2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function EmptyState({ 
  title = "No results found", 
  description = "Try adjusting your search or filters to find what you're looking for.", 
  icon = <FileX2 className="w-12 h-12 text-gray-300" />,
  className,
  action
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center min-h-[300px] border rounded-lg bg-gray-50/50", className)}>
      <div className="mb-4 bg-white p-4 rounded-full shadow-sm border">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
