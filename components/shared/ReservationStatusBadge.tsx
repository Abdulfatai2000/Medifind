import { ReservationStatus } from "@/types";
import { cn } from "@/lib/utils";

interface ReservationStatusBadgeProps {
  status: ReservationStatus;
  className?: string;
}

export function ReservationStatusBadge({ status, className }: ReservationStatusBadgeProps) {
  let label = "";
  let classes = "";

  switch (status) {
    case "PENDING_CONFIRMATION":
      label = "Pending Confirmation";
      classes = "bg-amber-100 text-amber-800 border-amber-200";
      break;
    case "CONFIRMED":
      label = "Confirmed";
      classes = "bg-blue-100 text-blue-800 border-blue-200";
      break;
    case "READY_FOR_PICKUP":
      label = "Ready for Pickup";
      classes = "bg-emerald-100 text-emerald-800 border-emerald-200";
      break;
    case "COMPLETED":
      label = "Completed";
      classes = "bg-gray-100 text-gray-800 border-gray-200";
      break;
    case "REJECTED":
      label = "Rejected";
      classes = "bg-red-100 text-red-800 border-red-200";
      break;
    case "CANCELLED":
      label = "Cancelled";
      classes = "bg-gray-100 text-gray-600 border-gray-200";
      break;
    case "EXPIRED":
      label = "Expired";
      classes = "bg-gray-100 text-gray-600 border-gray-200";
      break;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        classes,
        className
      )}
    >
      {label}
    </span>
  );
}
