import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { getLastArenaBattleLog } from "./_actions/get-last-arena-battle-log";
import { Form } from "./_components/form";

export default async function Page() {
  const lastArenaBattleLog = await getLastArenaBattleLog();

  return (
    <div className="p-4">
      <Card>
        <CardHeader />

        <CardContent>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/arena-battle-logs">
                戻る
              </Link>
            </Button>
          </div>

          <hr className="my-4" />

          <Form lastArenaBattleLog={lastArenaBattleLog} />
        </CardContent>
      </Card>

      <Toaster />
    </div>
  );
}
