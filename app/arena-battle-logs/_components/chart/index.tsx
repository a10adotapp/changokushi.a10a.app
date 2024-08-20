"use client";

import { listArenaBattleLogRow } from "@/sqlc/query_sql";
import { CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Scatter, Tooltip, XAxis, YAxis } from "recharts";

export function Chart({
  arenaBattleLogs,
}: {
  arenaBattleLogs: listArenaBattleLogRow[];
}) {
  const f = (x: number): number => {
    return (-0.0145 * x) + 3192;
  };

  const data = arenaBattleLogs.sort((arenaBattleLog1, arenaBattleLog2) => {
    if (arenaBattleLog1.resultPoint < arenaBattleLog2.resultPoint) {
      return -1;
    }

    if (arenaBattleLog1.resultPoint > arenaBattleLog2.resultPoint) {
      return 1;
    }

    return 0;
  }).map((arenaBattleLog) => {
    const powerDiff = arenaBattleLog.power - arenaBattleLog.opponentPower;

    console.log(powerDiff, f(powerDiff), arenaBattleLog.resultPoint);

    return {
      ...arenaBattleLog,
      powerDiff,
      estimatedResultPoint: f(powerDiff),
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={300}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="powerDiff"
          type="number"
          domain={["auto", "auto"]}
          reversed={true}
          allowDataOverflow={true}
          label={{
            value: "powerDiff",
            position: "insideTopRight",
            offset: -20,
          }}
        />

        <YAxis
          dataKey="resultPoint"
          type="number"
          domain={["auto", "auto"]}
          allowDataOverflow={true}
          label={{
            value: "resultPoint",
            position: "insideLeft",
            angle: -90,
            offset: -5,
          }}
        />

        <Line
          data={data}
          dataKey="estimatedResultPoint"
          type="monotone"
          stroke="blue"
          strokeWidth={1}
          dot={false} />

        <Scatter
          data={data}
          dataKey="resultPoint"
          type="monotone"
          stroke="black"
          strokeWidth={1} />

        <Tooltip />

        <Legend
          verticalAlign="top" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
