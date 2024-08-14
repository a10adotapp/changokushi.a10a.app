import { Card } from "@/components/ui/card";
import { client } from "@/lib/db/client";
import { listWeaponLog } from "@/sqlc/query_sql";
import { Table } from "./_components/table";

export const dynamic = "force-dynamic";

export default async function Page() {
  const cities = [
    "那覇",
    "宜野湾",
    "石垣",
    "浦添",
    "名護",
    "糸満",
    "沖縄",
    "豊見城",
    "うるま",
    "宮古島",
    "南城",
    "国頭",
    "大宜味",
    "東",
    "今帰仁",
    "本部",
    "恩納",
    "宜野座",
    "金武",
    "伊江",
    "読谷",
    "嘉手納",
    "北谷",
    "北中城",
    "中城",
    "西原",
    "与那原",
    "南風原",
    "久米島",
    "渡嘉敷",
    "座間味",
    "粟国",
    "渡名喜",
    "南大東",
    "北大東",
    "伊平屋",
    "伊是名",
    "八重瀬",
    "多良間",
    "竹富",
    "与那国",
  ];

  const suffixes = [
    "I",
    "II",
    "III",
    "IV",
  ];

  const weaponLogs = await listWeaponLog(client());

  return (
    <div className="p-4">
      <Card>
        <Table
          cities={cities}
          suffixes={suffixes}
          weaponLogs={weaponLogs} />
      </Card>
    </div>
  );
}
