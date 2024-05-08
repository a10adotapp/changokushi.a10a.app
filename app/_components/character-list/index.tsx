import { countLikes, listCharacters } from "@/sqlc/query_sql";
import { ListItem } from "./listitem";
import { client } from "@/lib/db/client";

export async function CharacterList() {
  const characters = await listCharacters(client());

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
