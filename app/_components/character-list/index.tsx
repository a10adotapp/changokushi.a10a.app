import { countLikes } from "@/sqlc/query_sql";
import { ListItem } from "./listitem";
import { client } from "@/lib/db/client";

export const dynamic = "force-dynamic";

export type Character = {
  id: number;
  name: string;
  imageUrl: string | null;
  profileUrl: string | null;
  bust: number | null;
  waist: number | null;
  hip: number | null;
  height: number | null;
};

export async function CharacterList({
  characters,
}: {
  characters: Character[];
}) {
  const likes = await countLikes(client());

  const likesByCharacterId = likes.reduce<{
    [key in number]: number;
  }>(
    (result, like) => ({
      ...result,
      [like.characterId]: like.count,
    }),
    {},
  );

  return (
    <div className="grid grid-cols-2 gap-2">
      {characters.map((character) => {
        return (
          <ListItem key={character.id} character={character} likeCount={likesByCharacterId[character.id] || 0} />
        );
      })}
    </div>
  );
}
