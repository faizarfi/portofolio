export default function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Crisp, subtle architectural grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Subtle top ambient daylight gradient */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white to-transparent opacity-80 dark:hidden" />
    </div>
  );
}




