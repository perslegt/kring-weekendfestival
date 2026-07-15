import { Suspense } from "react";
import Header from "@/components/Header";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <main className="site-background flex min-h-screen items-center justify-center px-5">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-acid">
              Aanmelding laden...
            </p>
          </main>
        }
      >
        {children}
      </Suspense>
    </>
  );
}
