import { Suspense } from "react";
import { TicketStep } from "@/components/SignupStep";

export default function TicketPage() {
  return (
    <Suspense fallback={null}>
      <TicketStep />
    </Suspense>
  );
}
