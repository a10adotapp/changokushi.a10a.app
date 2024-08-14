import mysql, { RowDataPacket } from "mysql2/promise";

type Client = mysql.Connection | mysql.Pool;

export const listCharactersQuery = `-- name: listCharacters :many
SELECT
  characters.id, characters.name, characters.gif_url, characters.image_url, characters.profile_url, characters.bust, characters.waist, characters.hip, characters.height,
  chantama_characters.id, chantama_characters.character_id, chantama_characters.sense, chantama_characters.attack, chantama_characters.weapon, chantama_characters.vitality, chantama_characters.strength, chantama_characters.physical_defense, chantama_characters.magical_defense, chantama_characters.agility
FROM
  characters
  LEFT JOIN
    chantama_characters
    ON (chantama_characters.character_id = characters.id)
ORDER BY
  characters.id`;

export interface listCharactersRow {
    id: number;
    name: string;
    gifUrl: string | null;
    imageUrl: string | null;
    profileUrl: string | null;
    bust: number | null;
    waist: number | null;
    hip: number | null;
    height: number | null;
    id_2: number | null;
    characterId: number | null;
    sense: string | null;
    attack: string | null;
    weapon: string | null;
    vitality: number | null;
    strength: number | null;
    physicalDefense: number | null;
    magicalDefense: number | null;
    agility: number | null;
}

export async function listCharacters(client: Client): Promise<listCharactersRow[]> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: listCharactersQuery,
        values: [],
        rowsAsArray: true
    });
    return rows.map(row => {
        return {
            id: row[0],
            name: row[1],
            gifUrl: row[2],
            imageUrl: row[3],
            profileUrl: row[4],
            bust: row[5],
            waist: row[6],
            hip: row[7],
            height: row[8],
            id_2: row[9],
            characterId: row[10],
            sense: row[11],
            attack: row[12],
            weapon: row[13],
            vitality: row[14],
            strength: row[15],
            physicalDefense: row[16],
            magicalDefense: row[17],
            agility: row[18]
        };
    });
}

export const countLikesQuery = `-- name: countLikes :many
SELECT
  character_id,
  COUNT(*) AS count
FROM
  likes
GROUP BY
  character_id`;

export interface countLikesRow {
    characterId: number;
    count: number;
}

export async function countLikes(client: Client): Promise<countLikesRow[]> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: countLikesQuery,
        values: [],
        rowsAsArray: true
    });
    return rows.map(row => {
        return {
            characterId: row[0],
            count: row[1]
        };
    });
}

export const countLikesByUserQuery = `-- name: countLikesByUser :one
SELECT
  COUNT(*) AS count
FROM
  likes
WHERE
  (user = ?)
  AND (liked_at >= ?)
  AND (liked_at < ?)`;

export interface countLikesByUserArgs {
    user: string;
    likedAtGte: Date;
    likedAtLt: Date;
}

export interface countLikesByUserRow {
    count: number;
}

export async function countLikesByUser(client: Client, args: countLikesByUserArgs): Promise<countLikesByUserRow | null> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: countLikesByUserQuery,
        values: [args.user, args.likedAtGte, args.likedAtLt],
        rowsAsArray: true
    });
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        count: row[0]
    };
}

export const createLikeQuery = `-- name: createLike :exec
INSERT INTO
  likes
  (character_id, user, liked_at)
VALUES
  (?, ?, NOW())`;

export interface createLikeArgs {
    characterId: number;
    user: string;
}

export async function createLike(client: Client, args: createLikeArgs): Promise<void> {
    await client.query({
        sql: createLikeQuery,
        values: [args.characterId, args.user]
    });
}

export const listWeaponLogQuery = `-- name: listWeaponLog :many
SELECT
  weapon_logs.id, weapon_logs.name, weapon_logs.url
FROM
  weapon_logs
ORDER BY
  id DESC`;

export interface listWeaponLogRow {
    id: number;
    name: string;
    url: string | null;
}

export async function listWeaponLog(client: Client): Promise<listWeaponLogRow[]> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: listWeaponLogQuery,
        values: [],
        rowsAsArray: true
    });
    return rows.map(row => {
        return {
            id: row[0],
            name: row[1],
            url: row[2]
        };
    });
}

export const getWeaponLogByNameQuery = `-- name: getWeaponLogByName :one
SELECT
  weapon_logs.id, weapon_logs.name, weapon_logs.url
FROM
  weapon_logs
WHERE
  (name = ?)
LIMIT
  1`;

export interface getWeaponLogByNameArgs {
    name: string;
}

export interface getWeaponLogByNameRow {
    id: number;
    name: string;
    url: string | null;
}

export async function getWeaponLogByName(client: Client, args: getWeaponLogByNameArgs): Promise<getWeaponLogByNameRow | null> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: getWeaponLogByNameQuery,
        values: [args.name],
        rowsAsArray: true
    });
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        name: row[1],
        url: row[2]
    };
}

export const createWeaponLogQuery = `-- name: createWeaponLog :exec
INSERT INTO
  weapon_logs
  (name)
VALUES
  (?)`;

export interface createWeaponLogArgs {
    name: string;
}

export async function createWeaponLog(client: Client, args: createWeaponLogArgs): Promise<void> {
    await client.query({
        sql: createWeaponLogQuery,
        values: [args.name]
    });
}

export const deleteWeaponLogQuery = `-- name: deleteWeaponLog :exec
DELETE FROM
  weapon_logs
WHERE
  (id = ?)`;

export interface deleteWeaponLogArgs {
    id: number;
}

export async function deleteWeaponLog(client: Client, args: deleteWeaponLogArgs): Promise<void> {
    await client.query({
        sql: deleteWeaponLogQuery,
        values: [args.id]
    });
}

export const updateWeaponLogQuery = `-- name: updateWeaponLog :exec
UPDATE
  weapon_logs
SET
  name = ?,
  url = ?
WHERE
  (id = ?)`;

export interface updateWeaponLogArgs {
    name: string;
    url: string | null;
    id: number;
}

export async function updateWeaponLog(client: Client, args: updateWeaponLogArgs): Promise<void> {
    await client.query({
        sql: updateWeaponLogQuery,
        values: [args.name, args.url, args.id]
    });
}

export const createArenaBattleLogQuery = `-- name: createArenaBattleLog :exec
INSERT INTO
  arena_battle_logs
  (point, power, opponent_point, opponent_power, result_point)
VALUES
  (?, ?, ?, ?, ?)`;

export interface createArenaBattleLogArgs {
    point: number;
    power: number;
    opponentPoint: number;
    opponentPower: number;
    resultPoint: number;
}

export async function createArenaBattleLog(client: Client, args: createArenaBattleLogArgs): Promise<void> {
    await client.query({
        sql: createArenaBattleLogQuery,
        values: [args.point, args.power, args.opponentPoint, args.opponentPower, args.resultPoint]
    });
}

export const updateArenaBattleLogQuery = `-- name: updateArenaBattleLog :exec
UPDATE
  arena_battle_logs
SET
  point = ?,
  power = ?,
  opponent_point = ?,
  opponent_power = ?,
  result_point = ?
WHERE
  (id = ?)`;

export interface updateArenaBattleLogArgs {
    point: number;
    power: number;
    opponentPoint: number;
    opponentPower: number;
    resultPoint: number;
    id: number;
}

export async function updateArenaBattleLog(client: Client, args: updateArenaBattleLogArgs): Promise<void> {
    await client.query({
        sql: updateArenaBattleLogQuery,
        values: [args.point, args.power, args.opponentPoint, args.opponentPower, args.resultPoint, args.id]
    });
}

export const deleteArenaBattleLogQuery = `-- name: deleteArenaBattleLog :exec
DELETE FROM
  arena_battle_logs
WHERE
  (id = ?)`;

export interface deleteArenaBattleLogArgs {
    id: number;
}

export async function deleteArenaBattleLog(client: Client, args: deleteArenaBattleLogArgs): Promise<void> {
    await client.query({
        sql: deleteArenaBattleLogQuery,
        values: [args.id]
    });
}

export const listArenaBattleLogQuery = `-- name: listArenaBattleLog :many
SELECT
  arena_battle_logs.id, arena_battle_logs.point, arena_battle_logs.power, arena_battle_logs.opponent_point, arena_battle_logs.opponent_power, arena_battle_logs.result_point
FROM
  arena_battle_logs
ORDER BY
  id DESC`;

export interface listArenaBattleLogRow {
    id: number;
    point: number;
    power: number;
    opponentPoint: number;
    opponentPower: number;
    resultPoint: number;
}

export async function listArenaBattleLog(client: Client): Promise<listArenaBattleLogRow[]> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: listArenaBattleLogQuery,
        values: [],
        rowsAsArray: true
    });
    return rows.map(row => {
        return {
            id: row[0],
            point: row[1],
            power: row[2],
            opponentPoint: row[3],
            opponentPower: row[4],
            resultPoint: row[5]
        };
    });
}

export const getArenaBattleLogQuery = `-- name: getArenaBattleLog :one
SELECT
  arena_battle_logs.id, arena_battle_logs.point, arena_battle_logs.power, arena_battle_logs.opponent_point, arena_battle_logs.opponent_power, arena_battle_logs.result_point
FROM
  arena_battle_logs
WHERE
  (id = ?)
LIMIT 1`;

export interface getArenaBattleLogArgs {
    id: number;
}

export interface getArenaBattleLogRow {
    id: number;
    point: number;
    power: number;
    opponentPoint: number;
    opponentPower: number;
    resultPoint: number;
}

export async function getArenaBattleLog(client: Client, args: getArenaBattleLogArgs): Promise<getArenaBattleLogRow | null> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: getArenaBattleLogQuery,
        values: [args.id],
        rowsAsArray: true
    });
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        point: row[1],
        power: row[2],
        opponentPoint: row[3],
        opponentPower: row[4],
        resultPoint: row[5]
    };
}

export const getLastArenaBattleLogQuery = `-- name: getLastArenaBattleLog :one
SELECT
  arena_battle_logs.id, arena_battle_logs.point, arena_battle_logs.power, arena_battle_logs.opponent_point, arena_battle_logs.opponent_power, arena_battle_logs.result_point
FROM
  arena_battle_logs
ORDER BY
  id DESC
LIMIT 1`;

export interface getLastArenaBattleLogRow {
    id: number;
    point: number;
    power: number;
    opponentPoint: number;
    opponentPower: number;
    resultPoint: number;
}

export async function getLastArenaBattleLog(client: Client): Promise<getLastArenaBattleLogRow | null> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: getLastArenaBattleLogQuery,
        values: [],
        rowsAsArray: true
    });
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        point: row[1],
        power: row[2],
        opponentPoint: row[3],
        opponentPower: row[4],
        resultPoint: row[5]
    };
}

export const getArenaBattleLogApproximateResultPointQuery = `-- name: getArenaBattleLogApproximateResultPoint :one
SELECT
  (
    SELECT
      t1.result_point
    FROM
      arena_battle_logs AS t1
    WHERE
      (t1.opponent_power <= ?)
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
      (t2.opponent_power >= ?)
    ORDER BY
      t2.opponent_power ASC
    LIMIT 1
  ) AS max_result_point`;

export interface getArenaBattleLogApproximateResultPointArgs {
    opponentPower: number;
    opponentPower: number;
}

export interface getArenaBattleLogApproximateResultPointRow {
    minResultPoint: number;
    maxResultPoint: number;
}

export async function getArenaBattleLogApproximateResultPoint(client: Client, args: getArenaBattleLogApproximateResultPointArgs): Promise<getArenaBattleLogApproximateResultPointRow | null> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: getArenaBattleLogApproximateResultPointQuery,
        values: [args.opponentPower, args.opponentPower],
        rowsAsArray: true
    });
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        minResultPoint: row[0],
        maxResultPoint: row[1]
    };
}

