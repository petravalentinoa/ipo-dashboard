export default function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3.5">
      <div className="flex gap-2.5">
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <p className="text-[13px] leading-relaxed text-primary/80">{children}</p>
      </div>
    </div>
  );
}
