import { Reservation } from "@/types";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReservationTimelineProps {
  reservation: Reservation;
}

export function ReservationTimeline({ reservation }: ReservationTimelineProps) {
  const steps = [
    {
      label: "Request Sent",
      date: new Date(reservation.requestedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
      status: "COMPLETED",
    },
    {
      label: "Pharmacy Confirmation",
      date: reservation.confirmedAt 
        ? new Date(reservation.confirmedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) 
        : null,
      status: reservation.status === "PENDING_CONFIRMATION" 
        ? "PENDING" 
        : reservation.status === "REJECTED" || reservation.status === "CANCELLED" 
          ? "FAILED" 
          : "COMPLETED",
    },
  ];

  if (reservation.status !== "REJECTED" && reservation.status !== "CANCELLED") {
    steps.push({
      label: "Ready for Pickup",
      date: reservation.status === "READY_FOR_PICKUP" || reservation.status === "COMPLETED" 
        ? new Date(reservation.updatedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) 
        : null,
      status: reservation.status === "READY_FOR_PICKUP" || reservation.status === "COMPLETED" 
        ? "COMPLETED" 
        : "PENDING",
    });
    
    steps.push({
      label: "Collected",
      date: reservation.status === "COMPLETED" 
        ? new Date(reservation.updatedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) 
        : null,
      status: reservation.status === "COMPLETED" ? "COMPLETED" : "PENDING",
    });
  }

  return (
    <div className="space-y-4">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            {step.status === "COMPLETED" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : step.status === "FAILED" ? (
              <XCircle className="w-5 h-5 text-red-500" />
            ) : (
              <Clock className="w-5 h-5 text-gray-300" />
            )}
            {idx !== steps.length - 1 && (
              <div className={cn("w-0.5 h-8 mt-1", step.status === "COMPLETED" ? "bg-emerald-600" : "bg-gray-200")} />
            )}
          </div>
          <div className="pb-4">
            <p className={cn("text-sm font-medium", step.status === "PENDING" ? "text-gray-500" : "text-gray-900")}>
              {step.label}
            </p>
            {step.date ? (
              <p className="text-xs text-gray-500 mt-0.5">{step.date}</p>
            ) : (
              <p className="text-xs text-gray-400 mt-0.5">Pending</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
