import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ 
  title = "Something went wrong", 
  description = "We couldn't load the requested data. Please try again.", 
  onRetry,
  className 
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center min-h-[300px] border border-red-100 rounded-lg bg-red-50/30", className)}>
      <div className="mb-4 bg-red-100 p-4 rounded-full text-red-600">
        <AlertCircle className="w-10 h-10" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 max-w-sm mb-6">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800">
          Try Again
        </Button>
      )}
    </div>
  );
}
