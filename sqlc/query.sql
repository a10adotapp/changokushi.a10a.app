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

-- name: createArenaBattleLog :exec
INSERT INTO
  arena_battle_logs
  (point, power, opponent_point, opponent_power, result_point)
VALUES
  (?, ?, ?, ?, ?)
;

-- name: updateArenaBattleLog :exec
UPDATE
  arena_battle_logs
SET
  point = sqlc.arg(point),
  power = sqlc.arg(power),
  opponent_point = sqlc.arg(opponent_point),
  opponent_power = sqlc.arg(opponent_power),
  result_point = sqlc.arg(result_point)
WHERE
  (id = ?)
;

-- name: deleteArenaBattleLog :exec
DELETE FROM
  arena_battle_logs
WHERE
  (id = ?)
;

-- name: listArenaBattleLog :many
SELECT
  arena_battle_logs.*
FROM
  arena_battle_logs
ORDER BY
  id DESC
;

-- name: getArenaBattleLog :one
SELECT
  arena_battle_logs.*
FROM
  arena_battle_logs
WHERE
  (id = ?)
LIMIT 1
;

-- name: getLastArenaBattleLog :one
SELECT
  arena_battle_logs.*
FROM
  arena_battle_logs
ORDER BY
  id DESC
LIMIT 1
;

-- name: getArenaBattleLogApproximateResultPoint :one
SELECT
  (
    SELECT
      t1.result_point
    FROM
      arena_battle_logs AS t1
    WHERE
      (t1.opponent_power <= sqlc.arg(opponent_power_1))
    ORDER BY
      t1.opponent_power DESC
    LIMIT 1
  ) AS min_result_point,
  (
    SELECT
      t2.result_point
    FROM
      arena_battle_logs AS t2
    WHERE
      (t2.opponent_power >= sqlc.arg(opponent_power_2))
    ORDER BY
      t2.opponent_power ASC
    LIMIT 1
  ) AS max_result_point
;
