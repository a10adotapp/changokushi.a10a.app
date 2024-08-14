"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { deleteArenaBattleLog } from "./_actions/delete";

export function DeleteButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  const [isBusy, setIsBusy] = useState(false);

  const click = useCallback(async () => {
    if (!confirm("削除しますか？")) {
      return;
    }

    try {
      setIsBusy(true);

      await deleteArenaBattleLog(id);

      toast({
        title: "削除しました",
      });

      router.push("/arena-battle-logs");
      router.refresh();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "削除できませんでした",
      });
    } finally {
      setIsBusy(false);
    }
  }, [id, router]);

  return (
    <Button variant="destructive" onClick={click}>
      削除
    </Button>
  );
}
