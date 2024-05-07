import { listCharacters } from "@/sqlc/query_sql";
import { client } from "@/lib/db/client";
import { CharacterList } from "./_components/character-list";

export default async function Page() {
  const characters = await listCharacters(client());

  return (
    <main>
      <CharacterList characters={characters} />
    </main>
  );
}
