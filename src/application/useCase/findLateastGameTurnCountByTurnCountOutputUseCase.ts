import { connectionMySQL } from "../../infrastructure/connection";
import { ApplicationError } from "../error/applicationError";
import { GameResult } from "../../domain/model/gameResult/gameResult";
import { TurnRepository } from "../../domain/model/turn/turnRepository";
import { GameRepository } from "../../domain/model/game/gameRepository";
import { GameResultRepository } from "../../domain/model/gameResult/GameResultRepository";

class FindLateastGameTurnCountByTurnCountOutput {
  constructor(
    private _turnCount: number,
    private _board: number[][],
    private _nextDisc: number | undefined,
    private _winnerDisc: number | undefined
  ) { }

  get turnCount() {
    return this._turnCount;
  }
  get board() {
    return this._board;
  }
  get nextDisc() {
    return this._nextDisc;
  }
  get winnerDisc() {
    return this._winnerDisc;
  }

}

export class FindLateastGameTurnCountByTurnCountOutputUseCase {
  constructor(
    private _turnRepository: TurnRepository,
    private _gameRepository: GameRepository,
    private _gameResultRepository: GameResultRepository
  ) {}
  
  async run(turnCount: number): Promise<FindLateastGameTurnCountByTurnCountOutput> {
    const conn = await connectionMySQL();
    try {
      const game = await this._gameRepository.findLatest(conn);
      if (!game) {
        throw new ApplicationError('LatestGameNotFound', 'Latest game not found');
      }

      if (!game.id) {
        throw new Error('game.if not exsist');
      }

      const turn = await this._turnRepository.findForGameIdAndTurnCount(
        conn,
        game.id,
        turnCount
      );
      let gameResult: GameResult | undefined
      if (turn.gameEnded()){
        gameResult = await this._gameResultRepository.findForGameId(conn, game.id);
      }

      return new FindLateastGameTurnCountByTurnCountOutput(
        turnCount,
        turn.board.discs,
        turn.nextDisc,
        gameResult?.winnerDisc
      )

    } finally {
      await conn.end();
    }
  }
}