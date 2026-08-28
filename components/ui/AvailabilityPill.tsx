export default function AvailabilityPill({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-3.5 py-1.5 shadow-xs">
      <span className="relative flex h-2 w-2">
        <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
      </span>
      <span className="text-xs font-semibold text-blue-800">{text}</span>
    </div>
  );
}
