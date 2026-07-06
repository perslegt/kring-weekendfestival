import { QrCode } from "lucide-react";

export default function QRPlaceholder({
  label = "SCAN OM AAN TE MELDEN",
}: {
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-40 w-40 shrink-0 sm:h-44 sm:w-44">
        {/* Hoek-brackets, viewfinder stijl */}
        <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-acid" />
        <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-acid" />
        <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-acid" />
        <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-acid" />
        <div className="flex h-full w-full items-center justify-center border border-dashed border-concrete bg-ink">
          <QrCode className="h-16 w-16 text-bone/40" strokeWidth={1.25} aria-hidden="true" />
        </div>
      </div>
      <p className="font-mono text-[11px] tracking-[0.2em] text-concrete">
        {label}
        <br />
        <span className="text-bone/50">[ QR-CODE VOLGT BIJ LANCERING ]</span>
      </p>
    </div>
  );
}
