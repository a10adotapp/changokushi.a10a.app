import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { listArenaBattleLog } from "./_actions/list-arena-battle-log";
import { Chart } from "./_components/chart";
import { Table } from "./_components/table";

export const dynamic = "force-dynamic";

export default async function Page() {
  const arenaBattleLogs = await listArenaBattleLog();

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <div className="flex gap-2 justify-end">
            <Button asChild variant="outline">
              <Link href="/arena-battle-logs/new">
                新規登録
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-auto">
            <div className="h-[300px]">
              <Chart arenaBattleLogs={arenaBattleLogs} />
            </div>
          </div>
        </CardContent>

        <hr />

        <Table arenaBattleLogs={arenaBattleLogs} />
      </Card>
    </div>
  );
}
