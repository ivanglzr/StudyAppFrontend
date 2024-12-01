import { LearnedFlashcardsChart } from "@/components/home/LearnedFlashcardsChart";
import { StudyTimeChart } from "@/components/home/StudyTimeChart";
import { getStats } from "@/services/stats/stats.service";

export default async function HomePage() {
  const stats = await getStats();

  if (!stats) return <p>There isn&apos;t any stats</p>;

  return (
    <>
      <header className="flex m-2 mb-6 text-4xl border-b-2 border-b-foreground/75 opacity-90">
        <h1>Stats</h1>
      </header>
      <div className="grid grid-cols-2 gap-4">
        <StudyTimeChart subjectsStats={stats.subjectsStats} />
        <LearnedFlashcardsChart
          subjectsFlashcardsStats={stats.flashcardStats.subjectsFlashcardsStats}
        />
      </div>
    </>
  );
}
