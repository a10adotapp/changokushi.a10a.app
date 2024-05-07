"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { Character } from ".";
import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { createLike } from "./create-like";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function ListItem({
  character,
  likeCount,
}: {
  character: Character;
  likeCount: number;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const drawerOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const drawerTriggerButtonClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const likeButtonClick = useCallback(async () => {
    setIsLoading(true);

    try {
      await createLike(character.id);

      toast({
        title: `${character.name}に投票しました！`,
      });

      router.refresh();

      setIsOpen(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: `${character.name}に投票できませんでした`,
        description: (() => {
          if (err instanceof Error) {
            return err.message;
          }

          return JSON.stringify(err);
        })(),
      });
    } finally {
      setIsLoading(false);
    }
  }, [character.id, character.name, router, toast]);

  const numberFormat = new Intl.NumberFormat();

  return (
    <Card className="hover:bg-blue-200">
      {character.imageUrl && (
        <Image src={character.imageUrl} alt={character.name} width={200} height={200}
          className="w-full h-32 object-contain" />
      )}

      <CardContent className="px-2">
        <div className="flex justify-between items-center gap-2">
          <span className="font-bold">
            {character.name}
          </span>

          <Drawer open={isOpen} onOpenChange={drawerOpenChange}>
            <DrawerTrigger asChild>
              <Button variant="ghost" onClick={drawerTriggerButtonClick} className="flex gap-1">
                <span>💕</span>
                <span className="text-sm text-gray-400 font-bold">
                  {numberFormat.format(likeCount)}
                </span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="pb-4">
              <DrawerHeader>
                <DrawerDescription>
                  {`${character.name}に投票しますか？`}
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button variant="default" onClick={likeButtonClick} disabled={isLoading}>
                  {isLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
                  投票する
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">
                    キャンセル
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </CardContent>
    </Card>
  );
}
