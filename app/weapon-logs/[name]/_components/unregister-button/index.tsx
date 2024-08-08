"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getWeaponLogByNameRow } from "@/sqlc/query_sql";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { unregister } from "./_actions/unregister";

export function UnregisterButton({
  weaponLog,
}: {
  weaponLog: getWeaponLogByNameRow;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [isBusy, setIsBusy] = useState(false);

  const click = useCallback(async () => {
    try {
      setIsBusy(true);

      await unregister(weaponLog.id);

      toast({
        title: "登録を解除しました。",
        description: weaponLog.name,
      });

      router.refresh();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "登録を解除できませんでした",
      });
    } finally {
      setIsBusy(false);
    }
  }, [router, toast, weaponLog.id, weaponLog.name]);

  return (
    <Button
      variant="default"
      onClick={click}
      disabled={isBusy}>
      登録を解除
    </Button>
  );
}
