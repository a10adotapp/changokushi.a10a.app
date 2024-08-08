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

-- name: listWeaponLog :many
SELECT
  weapon_logs.*
FROM
  weapon_logs
ORDER BY
  id DESC
;

-- name: getWeaponLogByName :one
SELECT
  weapon_logs.*
FROM
  weapon_logs
WHERE
  (name = ?)
LIMIT
  1
;

-- name: createWeaponLog :exec
INSERT INTO
  weapon_logs
  (name)
VALUES
  (?)
;

-- name: deleteWeaponLog :exec
DELETE FROM
  weapon_logs
WHERE
  (id = ?)
;

-- name: updateWeaponLog :exec
UPDATE
  weapon_logs
SET
  name = sqlc.arg(name),
  url = sqlc.arg(url)
WHERE
  (id = ?)
;
