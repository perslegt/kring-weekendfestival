import { Suspense } from "react";
import { SleepoverStep } from "@/components/SignupStep";

export default function SleepoverPage() {
  return (
    <Suspense fallback={null}>
      <SleepoverStep />
    </Suspense>
  );
}
