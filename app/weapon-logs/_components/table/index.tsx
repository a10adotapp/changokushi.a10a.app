"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableHead, TableRow, Table as UITable } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { client } from "@/lib/db/client";
import { listWeaponLogRow } from "@/sqlc/query_sql";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { registerWeaponLog } from "./_actions/register-weapon-log";
import { unregisterWeaponLog } from "./_actions/unregister-weapon-log";
import { useRouter } from "next/navigation";
import { updateWeaponLogUrl } from "./_actions/update-weapon-log-url";

export function Table({
  cities,
  suffixes,
  weaponLogs,
}: {
  cities: string[];
  suffixes: string[];
  weaponLogs: listWeaponLogRow[];
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [isBusy, setIsBusy] = useState(false);

  const urlByIdRef = useRef<{ [key in number]: string }>({});

  const copyButtonClick = useMemo(() => {
    return (value: string) => {
      return async () => {
        try {
          setIsBusy(true);

          await navigator.clipboard.writeText(value);

          toast({
            title: "コピーしました。",
            description: value,
          });

          router.refresh();
        } catch (err) {
          toast({
            variant: "destructive",
            title: "コピーできませんでした",
          });
        } finally {
          setIsBusy(false);
        }
      };
    };
  }, []);

  const registerButtonClick = useMemo(() => {
    return (weaponName: string) => {
      return async () => {
        try {
          setIsBusy(true);

          await registerWeaponLog(weaponName);

          toast({
            title: "登録しました。",
            description: weaponName,
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
      };
    };
  }, []);

  const unregisterButtonClick = useMemo(() => {
    return (weaponLog: listWeaponLogRow) => {
      return async () => {
        try {
          setIsBusy(true);

          await unregisterWeaponLog(weaponLog.id);

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
      };
    };
  }, []);

  const urlFieldChange = useMemo(() => {
    return (id: number) => {
      return async (event: ChangeEvent<HTMLInputElement>) => {
        urlByIdRef.current[id] = event.currentTarget.value;
      };
    };
  }, []);

  const updateUrlButtonClick = useMemo(() => {
    return (weaponLog: listWeaponLogRow) => {
      return async () => {
        try {
          setIsBusy(true);

          await updateWeaponLogUrl(weaponLog, (urlByIdRef.current[weaponLog.id] || ""));

          toast({
            title: "URLを保存しました。",
            description: weaponLog.name,
          });

          router.refresh();
        } catch (err) {
          toast({
            variant: "destructive",
            title: "URLを保存できませんでした",
          });
        } finally {
          setIsBusy(false);
        }
      };
    };
  }, []);

  return (
    <UITable>
      <TableBody>
        {cities.map((city, cityIndex) => {
          return (
            <TableRow key={`city-${cityIndex}`}>
              <TableHead>
                {city}
              </TableHead>

              {suffixes.map((suffix, suffixIndex) => {
                const weaponName = `${city}${suffix}`;

                const weaponLog = weaponLogs.find((weaponLog) => {
                  return weaponLog.name === weaponName;
                });

                return (
                  <TableCell
                    key={`city-${cityIndex}-suffix-${suffixIndex}`}
                    className="w-0 min-w-fit">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button
                          variant={weaponLog ? "default" : "outline"}
                          size="sm">
                          {suffix}
                        </Button>
                      </DrawerTrigger>

                      <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                          <DrawerHeader>
                            <DrawerTitle>
                              <Input value={weaponName} readOnly />
                            </DrawerTitle>
                          </DrawerHeader>

                          <div className="p-4">
                            <div className="flex flex-col gap-4">
                              <div className="flex justify-end gap-4">
                                <Button
                                  variant="outline"
                                  onClick={copyButtonClick(weaponName)}
                                  disabled={isBusy}>
                                  Copy
                                </Button>

                                {weaponLog ? (
                                  <Button
                                    variant="destructive"
                                    onClick={unregisterButtonClick(weaponLog)}
                                    disabled={isBusy}>
                                    Unregister
                                  </Button>
                                ) : (
                                  <Button
                                    variant="default"
                                    onClick={registerButtonClick(weaponName)}
                                    disabled={isBusy}>
                                    Register
                                  </Button>
                                )}
                              </div>

                              {weaponLog ? (
                                <>
                                  <hr className="my-4" />

                                  <div className="flex flex-col">
                                    <div>
                                      URL:
                                    </div>

                                    <div className="flex flex-col items-end gap-4">
                                      <Input
                                        defaultValue={weaponLog.url || ""}
                                        onChange={urlFieldChange(weaponLog.id)} />

                                      <Button
                                        variant="default"
                                        onClick={updateUrlButtonClick(weaponLog)}
                                        disabled={isBusy}>
                                        Update URL
                                      </Button>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </UITable>
  );
}
