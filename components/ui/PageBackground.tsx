export default function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Crisp, subtle architectural grid pattern for light mode */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Crisp, subtle architectural grid pattern for dark mode */}
      <div
        className="absolute inset-0 hidden opacity-[0.12] dark:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Subtle top ambient daylight gradient in light mode */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white to-transparent opacity-80 dark:hidden" />
    </div>
  );
}




