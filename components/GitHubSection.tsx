import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUsers,
  faArrowUpRightFromSquare,
  faBook,
  faCodeCommit,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { SectionHeading, Reveal } from "@/components/ui";

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

    const langCounts = ownRepos
      .filter((r) => r.language)
      .reduce<Record<string, number>>((acc, r) => {
        acc[r.language!] = (acc[r.language!] || 0) + 1;
        return acc;
      }, {});

    const topLanguages = Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const contributions: Contribution[] = contribJson?.contributions ?? [];
    const totalContributions: number = contribJson?.total?.lastYear ?? 0;

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
    <section id="github" className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            tag="Aktivitas Koding"
            title="Aktivitas Open Source &amp; GitHub"
            subtitle="Pantauan terhadap repositori, riwayat commit, dan kontribusi kode publik saya di GitHub (@faizarfi)."
          />
        </Reveal>

        {data ? (
          <div className="space-y-6">
            {/* Top Stat Row */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="neat-card flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <FontAwesomeIcon icon={faBook} className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{data.user.public_repos}</p>
                  <p className="text-xs font-semibold text-slate-500">Public Repos</p>
                </div>
              </div>

              <div className="neat-card flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <FontAwesomeIcon icon={faCodeCommit} className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{data.totalContributions || "Aktif"}</p>
                  <p className="text-xs font-semibold text-slate-500">Kontribusi 1 Thn</p>
                </div>
              </div>

              <div className="neat-card flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <FontAwesomeIcon icon={faStar} className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{data.totalStars}</p>
                  <p className="text-xs font-semibold text-slate-500">Repository Stars</p>
                </div>
              </div>

              <div className="neat-card flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <FontAwesomeIcon icon={faUsers} className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{data.user.followers}</p>
                  <p className="text-xs font-semibold text-slate-500">Followers</p>
                </div>
              </div>
            </div>

            {/* Heatmap & Languages */}
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Heatmap (8 cols) */}
              <div className="neat-card p-6 sm:p-8 lg:col-span-8">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Kalender Kontribusi GitHub
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Sedikit</span>
                    {CONTRIBUTION_LEVELS.map((lvl, idx) => (
                      <span key={idx} className={`h-3 w-3 rounded-xs ${lvl}`} />
                    ))}
                    <span>Banyak</span>
                  </div>
                </div>

                <div className="overflow-x-auto pb-3">
                  <div
                    className="relative mb-2.5"
                    style={{ height: 16, width: weeks.length * STRIDE }}
                  >
                    {monthLabels.map((ml) => (
                      <span
                        key={`${ml.label}-${ml.col}`}
                        className="absolute font-mono text-[11px] font-semibold text-slate-400"
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
                              className={`h-3 w-3 rounded-xs ${CONTRIBUTION_LEVELS[day.level]} transition-transform hover:scale-125`}
                            />
                          ) : (
                            <div key={di} className="h-3 w-3" />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500 sm:text-sm">
                  <span>
                    Total <strong className="text-slate-900 font-bold">{data.totalContributions}</strong>{" "}
                    aktivitas di tahun terakhir
                  </span>
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-800"
                  >
                    Buka Profil
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Languages (4 cols) */}
              <div className="neat-card flex flex-col justify-between p-6 sm:p-8 lg:col-span-4">
                <div>
                  <span className="mb-5 block text-xs font-bold tracking-wider text-slate-700 uppercase">
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
                            <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
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
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white transition-all hover:bg-blue-500 shadow-xs"
                >
                  <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                  Lihat Semua di GitHub
                </a>
              </div>
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
