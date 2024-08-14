import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { getArenaBattleLog } from "./_actions/get-arena-battle-log";
import { DeleteButton } from "./_components/delete-button";
import { UpdateForm } from "./_components/update-form";

const paramsSchema = z.object({
  id: z.string().min(1).pipe(z.coerce.number().min(1)),
});

export default async function Page({
  params,
}: {
  params: {
    [key in string]: string[] | string | null;
  };
}) {
  const parsedParams = paramsSchema.parse(params);

  const arenaBattleLog = await getArenaBattleLog(parsedParams.id);

  if (!arenaBattleLog) {
    return notFound();
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader />

        <CardContent>
          <div className="flex justify-between gap-2">
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/arena-battle-logs">
                  戻る
                </Link>
              </Button>
            </div>

            <div className="flex gap-2">
              <DeleteButton id={arenaBattleLog.id} />
            </div>
          </div>

          <hr className="my-4" />

          <UpdateForm arenaBattleLog={arenaBattleLog} />
        </CardContent>
      </Card>
    </div>
  );
}
