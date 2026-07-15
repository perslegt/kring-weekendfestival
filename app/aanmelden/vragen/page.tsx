import { Suspense } from "react";
import { QuestionsStep } from "@/components/SignupStep";

export default function QuestionsPage() {
  return (
    <Suspense fallback={null}>
      <QuestionsStep />
    </Suspense>
  );
}
