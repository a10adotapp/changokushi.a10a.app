-- name: listCharacters :many
SELECT
  characters.*,
  chantama_characters.*
FROM
  characters
  LEFT JOIN
    chantama_characters
    ON (chantama_characters.character_id = characters.id)
ORDER BY
  characters.id
;

-- name: countLikes :many
SELECT
  character_id,
  COUNT(*) AS count
FROM
  likes
GROUP BY
  character_id
;

-- name: countLikesByUser :one
SELECT
  COUNT(*) AS count
FROM
  likes
WHERE
  (user = sqlc.arg(user))
  AND (liked_at >= sqlc.arg(liked_at_gte))
  AND (liked_at < sqlc.arg(liked_at_lt))
;

-- name: createLike :exec
INSERT INTO
  likes
  (character_id, user, liked_at)
VALUES
  (?, ?, NOW())
;
