import { GameResult } from "../../../domain/model/gameResult/gameResult";
import { GameResultRepository } from "../../../domain/model/gameResult/GameResultRepository";
import { toWinnerDisc } from "../../../domain/model/gameResult/winnerDisc";
import { GameResultGateway } from "./gameResultGateway";
import mysql from "mysql2/promise";

const gameResultGateway = new GameResultGateway();

export class GameResultMySQLRepository implements GameResultRepository{
  async findForGameId(
    conn: mysql.Connection,
    gameId: number
  ): Promise<GameResult | undefined> {
    const gameResultRecord = await gameResultGateway.findForGameId(conn, gameId);

    if (!gameResultRecord) {
      return undefined;
    }

    return new GameResult(
      gameResultRecord.gameId,
      toWinnerDisc(gameResultRecord.winnerDisc),
      gameResultRecord.endAt
    )
  }

  async save(conn: mysql.Connection, gameResult: GameResult) {
    await gameResultGateway.insert(
      conn,
      gameResult.gameId,
      gameResult.winnerDisc,
      gameResult.endAt
    )
  }

}