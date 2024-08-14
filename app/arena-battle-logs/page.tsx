import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { listArenaBattleLog } from "./_actions/list-arena-battle-log";
import { Table } from "./_components/table";

export default async function Page() {
  const arenaBattleLogs = await listArenaBattleLog();

  return (
    <div className="p-4">
      <Card>
        <CardHeader />

        <CardContent>
          <div className="flex gap-2 justify-end">
            <Button asChild variant="outline">
              <Link href="/arena-battle-logs/new">
                新規登録
              </Link>
            </Button>
          </div>

          <hr className="my-4" />

          <Table arenaBattleLogs={arenaBattleLogs} />
        </CardContent>
      </Card>
    </div>
  );
}
