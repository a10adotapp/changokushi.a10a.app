"use client";

import { listArenaBattleLogRow } from "@/sqlc/query_sql";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function Chart({
  arenaBattleLogs,
}: {
  arenaBattleLogs: listArenaBattleLogRow[];
}) {
  const data = arenaBattleLogs.map((arenaBattleLog) => {
    return {
      x: arenaBattleLog.resultPoint,
      y: arenaBattleLog.opponentPower,
    };
  }).sort((d1, d2) => {
    if (d1.x < d2.x) {
      return -1;
    }

    if (d1.x > d2.x) {
      return 1;
    }

    return 0;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 3" />

        <YAxis
          dataKey="y"
          domain={[160000, 180000]}
          type="number"
          interval={0}
          allowDataOverflow={true}
        />

        <XAxis
          dataKey="x"
          domain={[2300, 2700]}
          interval={0}
          type="number"
          allowDataOverflow={true}
        />

        <Line strokeWidth={1} data={data} type="monotone" dataKey="y" stroke="black" />

        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}
