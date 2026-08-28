export default function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle light dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148, 163, 184, 0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Luminous ambient blue & indigo color orbs */}
      <div className="absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full bg-blue-100/70 blur-[130px]" />
      <div className="absolute top-[18%] -right-24 h-[480px] w-[480px] rounded-full bg-indigo-100/50 blur-[140px]" />
      <div className="absolute top-[45%] left-[10%] h-[400px] w-[400px] rounded-full bg-sky-100/60 blur-[120px]" />
      <div className="absolute top-[70%] -right-20 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-[140px]" />
      <div className="absolute -bottom-28 left-[20%] h-[450px] w-[450px] rounded-full bg-indigo-100/40 blur-[130px]" />

      {/* Top subtle light bloom */}
      <div className="absolute top-0 left-1/2 h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white via-blue-50/40 to-transparent blur-[80px]" />

      {/* Soft vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 60%, rgba(248, 250, 252, 0.6) 100%)",
        }}
      />
    </div>
  );
}
