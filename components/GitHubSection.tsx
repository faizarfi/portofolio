import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUsers,
  faArrowUpRightFromSquare,
  faBook,
  faCodeCommit,
  faArrowsLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { SectionHeading, Reveal, AnimatedCounter } from "@/components/ui";

const GITHUB_USERNAME = "faizarfi";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-600",
  JavaScript: "bg-amber-400",
  PHP: "bg-indigo-600",
  Blade: "bg-rose-500",
  CSS: "bg-sky-500",
  HTML: "bg-orange-500",
  Vue: "bg-emerald-500",
  Python: "bg-blue-500",
};

const CONTRIBUTION_LEVELS = [
  "bg-slate-100",
  "bg-blue-200",
  "bg-blue-400",
  "bg-blue-600",
  "bg-blue-800",
] as const;

const CELL_PX = 10;
const GAP_PX = 3;
const STRIDE = CELL_PX + GAP_PX;

interface GitHubUser {
  public_repos: number;
  followers: number;
}
interface GitHubRepo {
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}
interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

function buildCalendar(contributions: Contribution[]): (Contribution | null)[][] {
  if (!contributions.length) return [];
  const firstDay = new Date(contributions[0].date).getDay();
  const padded: (Contribution | null)[] = [...Array(firstDay).fill(null), ...contributions];
  const weeks: (Contribution | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

function getMonthLabels(weeks: (Contribution | null)[][]): Array<{ col: number; label: string }> {
  const labels: Array<{ col: number; label: string }> = [];
  const seen = new Set<string>();
  weeks.forEach((week, i) => {
    const first = week.find(Boolean) as Contribution | undefined;
    if (!first) return;
    const d = new Date(first.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!seen.has(key)) {
      seen.add(key);
      labels.push({ col: i, label: d.toLocaleString("id-ID", { month: "short" }) });
    }
  });
  return labels;
}

async function getGitHubData() {
  try {
    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        next: { revalidate: 86400 },
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
        next: { revalidate: 86400 },
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`, {
        next: { revalidate: 86400 },
      }),
    ]);

    if (!userRes.ok) return null;

    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];
    const contribJson = contribRes.ok ? await contribRes.json() : null;

    const ownRepos = repos.filter((r) => !r.fork);
    const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);

    const langCounts: Record<string, number> = {};
    ownRepos.forEach((r) => {
      if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    });

    const topLanguages = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    let contributions: Contribution[] = [];
    let totalContributions = 0;
    if (contribJson?.contributions) {
      contributions = contribJson.contributions;
      totalContributions = contribJson.total?.lastYear ?? 0;
    }

    return {
      user,
      totalStars,
      topLanguages,
      contributions,
      totalContributions,
      totalLangCount: ownRepos.filter((r) => r.language).length,
    };
  } catch {
    return null;
  }
}

export default async function GitHubSection() {
  const data = await getGitHubData();
  const weeks = data ? buildCalendar(data.contributions) : [];
  const monthLabels = getMonthLabels(weeks);

  return (
    <section id="github" className="w-full px-3.5 py-12 sm:px-6 lg:px-8 lg:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Aktivitas Koding"
            title="Aktivitas Open Source &amp; GitHub"
            subtitle="Pantauan terhadap repositori, riwayat commit, dan kontribusi kode publik saya di GitHub (@faizarfi)."
          />
        </Reveal>

        {data ? (
          <div className="space-y-6">
            {/* Top Stat Row with Animated Counters */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
              <Reveal delay={40} direction="up">
                <div className="neat-card flex items-center gap-3 p-3.5 sm:gap-4 sm:p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 sm:h-11 sm:w-11 sm:rounded-xl">
                    <FontAwesomeIcon icon={faBook} className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xl font-black text-slate-900 sm:text-2xl">
                      <AnimatedCounter target={data.user.public_repos} />
                    </p>
                    <p className="truncate text-[11px] font-semibold text-slate-500 sm:text-xs">Public Repos</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80} direction="up">
                <div className="neat-card flex items-center gap-3 p-3.5 sm:gap-4 sm:p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 sm:h-11 sm:w-11 sm:rounded-xl">
                    <FontAwesomeIcon icon={faCodeCommit} className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xl font-black text-slate-900 sm:text-2xl">
                      {typeof data.totalContributions === "number" && data.totalContributions > 0 ? (
                        <AnimatedCounter target={data.totalContributions} />
                      ) : (
                        "Aktif"
                      )}
                    </p>
                    <p className="truncate text-[11px] font-semibold text-slate-500 sm:text-xs">Kontribusi 1 Thn</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120} direction="up">
                <div className="neat-card flex items-center gap-3 p-3.5 sm:gap-4 sm:p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 sm:h-11 sm:w-11 sm:rounded-xl">
                    <FontAwesomeIcon icon={faStar} className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xl font-black text-slate-900 sm:text-2xl">
                      <AnimatedCounter target={data.totalStars} />
                    </p>
                    <p className="truncate text-[11px] font-semibold text-slate-500 sm:text-xs">Repo Stars</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={160} direction="up">
                <div className="neat-card flex items-center gap-3 p-3.5 sm:gap-4 sm:p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 sm:h-11 sm:w-11 sm:rounded-xl">
                    <FontAwesomeIcon icon={faUsers} className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xl font-black text-slate-900 sm:text-2xl">
                      <AnimatedCounter target={data.user.followers} />
                    </p>
                    <p className="truncate text-[11px] font-semibold text-slate-500 sm:text-xs">Followers</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Heatmap & Languages Grid */}
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Heatmap Card (8 cols) - fully responsive with horizontal scrolling */}
              <Reveal delay={100} direction="left" className="lg:col-span-8">
                <div className="neat-card max-w-full overflow-hidden p-4 sm:p-6 lg:p-8">
                  {/* Header with Title and Levels Legend */}
                  <div className="mb-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-display text-xs font-bold tracking-wider text-slate-700 uppercase">
                      Kalender Kontribusi GitHub
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span>Sedikit</span>
                      {CONTRIBUTION_LEVELS.map((lvl, idx) => (
                        <span key={idx} className={`h-2.5 w-2.5 rounded-xs sm:h-3 sm:w-3 ${lvl}`} />
                      ))}
                      <span>Banyak</span>
                    </div>
                  </div>

                  {/* Mobile scroll hint */}
                  <div className="mb-2.5 flex items-center gap-1.5 text-[11px] font-medium text-slate-400 sm:hidden">
                    <FontAwesomeIcon icon={faArrowsLeftRight} className="h-3 w-3 text-blue-500" />
                    <span>Geser ke samping untuk melihat kalender penuh</span>
                  </div>

                  {/* Horizontal scrollable calendar wrapper */}
                  <div className="max-w-full overflow-x-auto pb-3 pt-1">
                    <div className="inline-block min-w-max">
                      <div
                        className="relative mb-2"
                        style={{ height: 16, width: weeks.length * STRIDE }}
                      >
                        {monthLabels.map((ml) => (
                          <span
                            key={`${ml.label}-${ml.col}`}
                            className="absolute font-mono text-[10px] font-semibold text-slate-400 sm:text-[11px]"
                            style={{ left: ml.col * STRIDE }}
                          >
                            {ml.label}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-1">
                        {weeks.map((week, wi) => (
                          <div key={wi} className="flex flex-col gap-1">
                            {Array.from({ length: 7 }).map((_, di) => {
                              const day = week[di];
                              return day ? (
                                <div
                                  key={di}
                                  title={`${day.date}: ${day.count} kontribusi`}
                                  className={`h-2.5 w-2.5 rounded-xs sm:h-3 sm:w-3 ${CONTRIBUTION_LEVELS[day.level]} transition-transform duration-150 hover:scale-130`}
                                />
                              ) : (
                                <div key={di} className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom stats and direct link */}
                  <div className="mt-4 flex flex-col gap-2.5 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
                    <span>
                      Total <strong className="font-bold text-slate-900">{data.totalContributions}</strong>{" "}
                      aktivitas di tahun terakhir
                    </span>
                    <a
                      href={`https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                    >
                      Buka Profil
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Languages Card (4 cols) */}
              <Reveal delay={140} direction="right" className="lg:col-span-4">
                <div className="neat-card flex h-full flex-col justify-between p-5 sm:p-6 lg:p-8">
                  <div>
                    <span className="font-display mb-4 block text-xs font-bold tracking-wider text-slate-700 uppercase">
                      Distribusi Bahasa
                    </span>
                    <div className="space-y-3.5">
                      {data.topLanguages.map(([lang, count]) => {
                        const pct = Math.round((count / (data.totalLangCount || 1)) * 100);
                        const color = LANG_COLORS[lang] ?? "bg-blue-600";
                        return (
                          <div key={lang}>
                            <div className="mb-1 flex items-center justify-between text-xs sm:text-sm">
                              <div className="flex items-center gap-2">
                                <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                                <span className="font-semibold text-slate-700">{lang}</span>
                              </div>
                              <span className="font-mono font-bold text-slate-500">{pct}%</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={`h-full rounded-full ${color} transition-all duration-1000`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-xs shadow-blue-600/25 transition-all duration-200 hover:bg-blue-500 hover:shadow-md sm:py-3 active:scale-95"
                  >
                    <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                    Lihat Semua di GitHub
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        ) : (
          <div className="neat-card p-8 text-center">
            <p className="text-sm text-slate-500">Statistik GitHub @{GITHUB_USERNAME}</p>
          </div>
        )}
      </div>
    </section>
  );
}
