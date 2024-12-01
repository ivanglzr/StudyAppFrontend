"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ISubjectFlashcardsStats } from "@/interfaces/stats.interfaces";

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

  return chartData;
}

interface Props {
  subjectsFlashcardsStats: ISubjectFlashcardsStats[];
}

export function LearnedFlashcardsChart({ subjectsFlashcardsStats }: Props) {
  const chartData = getChartData(subjectsFlashcardsStats);

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="text-2xl">Learned Flashcards</CardTitle>
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
              radius={4}
            />
            <Bar
              dataKey="totalFlashcards"
              fill="var(--color-totalFlashcards)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
