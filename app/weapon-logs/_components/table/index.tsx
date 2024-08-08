"use client";

import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableHead, TableRow, Table as UITable } from "@/components/ui/table";
import { listWeaponLogRow } from "@/sqlc/query_sql";
import Link from "next/link";

export function Table({
  cities,
  suffixes,
  weaponLogs,
}: {
  cities: string[];
  suffixes: string[];
  weaponLogs: listWeaponLogRow[];
}) {
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
                    <Button
                      asChild
                      variant={weaponLog ? "default" : "outline"}
                      size="sm">
                      <Link href={`/weapon-logs/${weaponName}`}>
                        {suffix}
                      </Link>
                    </Button>
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
