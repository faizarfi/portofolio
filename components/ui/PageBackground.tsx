export default function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle modern dot matrix pattern */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148, 163, 184, 0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Luminous ambient floating orbs */}
      <div className="animate-float-slow absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-blue-200/50 to-indigo-100/40 blur-[130px]" />
      <div className="animate-float-reverse absolute top-[18%] -right-24 h-[480px] w-[480px] rounded-full bg-gradient-to-bl from-indigo-200/40 to-sky-100/50 blur-[140px]" />
      <div className="animate-pulse-glow absolute top-[45%] left-[8%] h-[420px] w-[420px] rounded-full bg-sky-200/45 blur-[125px]" />
      <div className="animate-float-slow absolute top-[70%] -right-20 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-[140px]" />
      <div className="animate-float-reverse absolute -bottom-28 left-[20%] h-[450px] w-[450px] rounded-full bg-indigo-200/35 blur-[130px]" />

      {/* Top radiant light bloom */}
      <div className="absolute top-0 left-1/2 h-[320px] w-[850px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white via-blue-50/50 to-transparent blur-[80px]" />

      {/* Soft vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 65%, rgba(248, 250, 252, 0.7) 100%)",
        }}
      />
    </div>
  );
}
