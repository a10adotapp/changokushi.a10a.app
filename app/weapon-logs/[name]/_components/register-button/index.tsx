"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { register } from "./_actions/register";

export function RegisterButton({
  name,
}: {
  name: string;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [isBusy, setIsBusy] = useState(false);

  const click = useCallback(async () => {
    try {
      setIsBusy(true);

      await register(name);

      toast({
        title: "登録しました。",
        description: name,
      });

      router.refresh();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "登録できませんでした",
      });
    } finally {
      setIsBusy(false);
    }
  }, [name, router, toast]);

  return (
    <Button
      variant="default"
      onClick={click}
      disabled={isBusy}>
      登録
    </Button>
  );
}
