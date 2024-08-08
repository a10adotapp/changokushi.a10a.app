"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

export function CopyButton({
  name,
}: {
  name: string;
}) {
  const { toast } = useToast();

  const click = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(name);

      toast({
        title: "コピーしました。",
        description: name,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "コピーできませんでした",
      });
    }
  }, [name, toast]);

  return (
    <Button
      variant="outline"
      onClick={click}>
      武器名をコピー
    </Button>
  );
}
