"use client";

import { useMemo } from "react";

import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ISubjectStats } from "@/interfaces/stats.interfaces";

function getChartConfig(subjectStats: ISubjectStats[]) {
  const chartConfig: ChartConfig = {
    studyTime: {
      label: "Study Time",
    },
  };

  const chartData = subjectStats.map((stats, i) => {
    const { subjectName } = stats.subject;

    const chartIndex = (i % 5) + 1;

    chartConfig[subjectName] = {
      label: subjectName,
      color: `hsl(var(--chart-${chartIndex}))`,
    };

    return {
      subjectName,
      studyTime: stats.studyTime,
      fill: `var(--color-${subjectName})`,
    };
  });

  return { chartData, chartConfig };
}

interface Props {
  subjectsStats: ISubjectStats[];
}

export function StudyTimeChart({ subjectsStats }: Props) {
  const { chartData, chartConfig } = getChartConfig(subjectsStats);

  const totalStudyTime = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.studyTime, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col bg-transparent">
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
