import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { getLastArenaBattleLog } from "./_actions/get-last-arena-battle-log";
import { Form } from "./_components/form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const lastArenaBattleLog = await getLastArenaBattleLog();

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/arena-battle-logs">
                戻る
              </Link>
            </Button>
          </div>
        </CardHeader>

        <hr className="mb-4" />

        <CardContent>
          <Form lastArenaBattleLog={lastArenaBattleLog} />
        </CardContent>
      </Card>
    </div>
  );
}
