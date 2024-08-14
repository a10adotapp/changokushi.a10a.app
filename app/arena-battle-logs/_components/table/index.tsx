import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table as UITable } from "@/components/ui/table";
import { listArenaBattleLogRow } from "@/sqlc/query_sql";
import Link from "next/link";

const numberFormat = new Intl.NumberFormat();

export function Table({
  arenaBattleLogs,
}: {
  arenaBattleLogs: listArenaBattleLogRow[];
}) {
  return (
    <UITable>
      <TableHeader>
        <TableRow>
          <TableHead className="px-2">
            <div className="text-end font-bold text-xs">
              取得ポイント
            </div>
          </TableHead>

          <TableHead className="px-2">
            <div className="flex flex-col gap-1">
              <div className="text-end text-xs">
                戦力
              </div>

              <div className="text-end text-gray-400 text-xs">
                ランク値
              </div>
            </div>
          </TableHead>

          <TableHead className="px-2">
            <div className="flex flex-col gap-1">
              <div className="text-end text-xs">
                対戦相手戦力
              </div>

              <div className="text-end text-gray-400 text-xs">
                対戦相手ランク値
              </div>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {arenaBattleLogs.map((arenaBattleLog) => {
          return (
            <TableRow key={`arena-battle-log-${arenaBattleLog.id}`}>
              <TableCell className="p-2 align-top">
                <Link href={`/arena-battle-logs/${arenaBattleLog.id}`}>
                  <div className="text-end font-bold">
                    {numberFormat.format(arenaBattleLog.resultPoint)}
                  </div>
                </Link>
              </TableCell>

              <TableCell className="p-2 align-top">
                <div className="flex flex-col gap-1">
                  <div className="text-end">
                    {numberFormat.format(arenaBattleLog.power)}
                  </div>

                  <div className="text-end text-gray-400">
                    {numberFormat.format(arenaBattleLog.point)}
                  </div>
                </div>
              </TableCell>

              <TableCell className="p-2 align-top">
                <div className="flex flex-col gap-1">
                  <div className="text-end">
                    {numberFormat.format(arenaBattleLog.opponentPower)}
                  </div>

                  <div className="text-end text-gray-400">
                    {numberFormat.format(arenaBattleLog.opponentPoint)}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </UITable>
  );
}
