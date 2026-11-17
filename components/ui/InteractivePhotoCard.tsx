import Image from "next/image";

export default function InteractivePhotoCard() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="group relative">
        <div className="absolute -inset-2.5 rounded-full border border-dashed border-slate-300/80 dark:border-zinc-700/70 pointer-events-none transition-colors duration-300 group-hover:border-slate-500 dark:group-hover:border-zinc-500" />

        <div className="relative h-44 w-44 sm:h-52 sm:w-52 lg:h-56 lg:w-56 overflow-hidden rounded-full border-2 border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 shadow-sm">
          <Image
            src="/foto.jpeg"
            alt="Foto profil Faiz Arfian Ilhami"
            fill
            preload
            fetchPriority="high"
            className="object-cover object-[center_20%]"
            sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 224px"
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="font-mono text-[11px] text-slate-600 dark:text-zinc-400">
          Berbasis di Indonesia
        </p>
        <p className="mt-0.5 font-display text-xs sm:text-sm font-semibold text-slate-800 dark:text-zinc-200">
          Terbuka untuk Full-time &amp; Remote
        </p>
      </div>
    </div>
  );
}
