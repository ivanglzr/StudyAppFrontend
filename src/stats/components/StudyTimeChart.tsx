"use client";

import { useMemo } from "react";

import { Label, Pie, PieChart } from "recharts";

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
import { ISubjectStats } from "../interfaces";

function getChartConfig(subjectStats: ISubjectStats[]) {
  const chartConfig: ChartConfig = {
    studyTime: {
      label: "Study Time",
    },
  };

  const chartData = subjectStats
    .filter((stats) => stats.studyTime > 0)
    .map((stats, i) => {
      const { subjectName } = stats.subject;

      chartConfig[subjectName] = {
        label: subjectName,
      };

      return {
        subjectName,
        studyTime: parseFloat((stats.studyTime / 60.0).toFixed(2)),
        fill: stats.subject.color,
      };
    });

  if (chartData.length === 0) return undefined;

  return { chartData, chartConfig };
}

interface Props {
  subjectsStats: ISubjectStats[];
}

export function StudyTimeChart({ subjectsStats }: Props) {
  const chart = getChartConfig(subjectsStats);

  if (chart === undefined) return <h2>You haven't studied anything 😡</h2>;

  const { chartData, chartConfig } = chart;

  const totalStudyTime = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.studyTime, 0).toFixed(2);
  }, [chartData]);

  return (
    <Card className="flex flex-col bg-transparent shadow-none border-none">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl">Study Time Stats</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-80"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="studyTime"
              nameKey="subjectName"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStudyTime.toLocaleString() + " h"}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Study Time
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}