"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { createLike } from "./create-like";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export type Character = {
  id: number;
  name: string;
  gifUrl: string | null;
  imageUrl: string | null;
  profileUrl: string | null;
  bust: number | null;
  waist: number | null;
  hip: number | null;
  height: number | null;
};

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
    <Card className="hover:bg-blue-200" style={{
      ...(character.imageUrl ? {
        backgroundImage: `url(${character.imageUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      } : {}),
    }}>
      {character.gifUrl && (
        <Drawer>
          <DrawerTrigger className="block w-full">
            <Image src={character.gifUrl} alt={character.name} unoptimized
              width={200} height={200}
              className="w-full h-32 object-contain bg-white/75" />
          </DrawerTrigger>
          <DrawerContent className="pb-4">
            <div className="flex flex-col gap-4">
              {character.imageUrl && (
                <div>
                  <Image src={character.imageUrl} alt={character.name}
                    width={400} height={400}
                    className="w-full h-96 object-contain" />
                </div>
              )}


              <div className="flex justify-center gap-4">
                <Card>
                  <CardContent>
                    {character.height}
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    {character.bust}
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    {character.waist}
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    {character.hip}
                  </CardContent>
                </Card>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}

      <CardContent className="px-2 bg-white/75">
        <div className="flex justify-between items-center gap-2">
          <span className="font-bold">
            {character.name}
          </span>

          <Drawer open={isOpen} onOpenChange={drawerOpenChange}>
            <DrawerTrigger asChild>
              <Button variant="outline" onClick={drawerTriggerButtonClick} className="flex gap-1">
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
