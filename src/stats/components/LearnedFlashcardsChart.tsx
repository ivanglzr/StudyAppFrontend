"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/ui";

import { ISubjectFlashcardsStats } from "../interfaces";

const chartConfig = {
  learnedFlashcards: {
    label: "Learned Flashcards",
    color: "hsl(var(--chart-2))",
  },
  totalFlashcards: {
    label: "Total Flashcards",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function getChartData(subjectsFlashcardsStats: ISubjectFlashcardsStats[]) {
  const chartData = subjectsFlashcardsStats.map((stats) => ({
    subjectName: stats.subject.subjectName,
    learnedFlashcards: stats.learnedFlashcards,
    totalFlashcards: stats.totalFlashcards,
  }));

  if (chartData.every((data) => data.totalFlashcards === 0)) return undefined;

  return chartData;
}

interface Props {
  subjectsFlashcardsStats: ISubjectFlashcardsStats[];
}

export function LearnedFlashcardsChart({ subjectsFlashcardsStats }: Props) {
  const chartData = getChartData(subjectsFlashcardsStats);

  if (chartData === undefined)
    return (
      <div>
        <h2>There isn't any Flashcards</h2>
        <p>Why haven't you created one yet?</p>
      </div>
    );

  return (
    <Card className="bg-transparent shadow-none border-none text-center">
      <CardHeader>
        <CardTitle className="text-2xl mb-2">Learned Flashcards</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="subjectName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="learnedFlashcards"
              fill="var(--color-learnedFlashcards)"
              radius={7}
            />
            <Bar
              dataKey="totalFlashcards"
              fill="var(--color-totalFlashcards)"
              radius={7}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
