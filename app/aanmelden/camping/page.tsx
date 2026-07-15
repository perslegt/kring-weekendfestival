import { Suspense } from "react";
import { CampingStep } from "@/components/SignupStep";

export default function CampingPage() {
  return (
    <Suspense fallback={null}>
      <CampingStep />
    </Suspense>
  );
}
