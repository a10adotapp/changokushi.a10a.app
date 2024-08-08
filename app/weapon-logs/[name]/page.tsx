import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { z } from "zod";
import { getWeapon } from "./_actions/get-weapon";
import { CopyButton } from "./_components/copy-button";
import { RegisterButton } from "./_components/register-button";
import { UnregisterButton } from "./_components/unregister-button";
import { UpdateForm } from "./_components/update-form";

const paramsSchema = z.object({
  name: z.string().min(1).pipe(
    z.preprocess((arg: unknown) => {
      if (typeof arg === "string") {
        return decodeURIComponent(arg);
      }

      return arg;
    }, z.string().min(1)),
  ),
});

export default async function Page({
  params,
}: {
  params: {
    [key in string]: string[] | string | null;
  };
}) {
  const parsedParams = paramsSchema.parse(params);

  const weaponLog = await getWeapon(parsedParams.name);

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center gap-4">
            <CardTitle>
              {weaponLog?.url ? (
                <a href={weaponLog.url} target="_blank">
                  {parsedParams.name}
                </a>
              ) : (
                <span>
                  {parsedParams.name}
                </span>
              )}
            </CardTitle>

            <div className="flex gap-2">
              {weaponLog ? (
                <UnregisterButton weaponLog={weaponLog} />
              ) : (
                <RegisterButton name={parsedParams.name} />
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <hr className="mb-4" />

          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/weapon-logs">
                戻る
              </Link>
            </Button>

            <CopyButton name={parsedParams.name} />

            {weaponLog?.url ? (
              <Button asChild variant="outline">
                <a href={weaponLog.url} target="_blank">
                  NFTページを開く
                </a>
              </Button>
            ) : null}
          </div>

          {weaponLog ? (
            <>
              <hr className="my-4" />

              <UpdateForm weaponLog={weaponLog} />
            </>
          ) : null}
        </CardContent>
      </Card>

      <Toaster />
    </div>
  )
}
