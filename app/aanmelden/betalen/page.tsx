import { Suspense } from "react";
import PaymentStep from "@/components/PaymentStep";

export default function PaymentPage() {
  return (
    <Suspense fallback={null}>
      <PaymentStep />
    </Suspense>
  );
}
