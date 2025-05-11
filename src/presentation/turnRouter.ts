import express from "express";
import { FindLateastGameTurnCountByTurnCountOutputUseCase } from "../application/useCase/findLateastGameTurnCountByTurnCountOutputUseCase";
import { Point } from "../domain/model/turn/point";
import { toDisc } from "../domain/model/turn/disc";
import { TurnMySQLRepository } from "../infrastructure/repository/turn/turnMySQLRepository";
import { GameMySQLRepository } from "../infrastructure/repository/game/gameMySQLRepository";
import { GameResultMySQLRepository } from "../infrastructure/repository/gameResult/gameResultMySQLRepository"
import { ResisterTurnUseCase } from "../application/useCase/resisterTurnUseCase";

export const turnRouter = express.Router();

const findLateastGameTurnCountByTurnCountOutputUseCase = new FindLateastGameTurnCountByTurnCountOutputUseCase(
  new TurnMySQLRepository(),
  new GameMySQLRepository(),
  new GameResultMySQLRepository()
)

const resisterTurnUseCase = new ResisterTurnUseCase(
  new TurnMySQLRepository(),
  new GameMySQLRepository(),
  new GameResultMySQLRepository()
);

interface TurnGetResponsBody {
  turnCount: number,
  board: number[][],
  nextDisc: number | null,
  winnerDisc: number | null
}

turnRouter.get('/api/games/latest/turns/:turnCount', async (req, res: express.Response<TurnGetResponsBody>) => {
  const turnCount = parseInt(req.params.turnCount);

  const output = await findLateastGameTurnCountByTurnCountOutputUseCase.run(turnCount);

  const responseBody = {
    turnCount: output.turnCount,
    board: output.board,
    nextDisc: output.nextDisc ?? null,
    winnerDisc: output.winnerDisc ?? null
  }

  res.json(responseBody);
})

interface TurnPostRequestBody {
  turnCount: number
  move: {
    disc: number
    x: number
    y: number
  }
}

turnRouter.post('/api/games/latest/turns', async (req: express.Request<{}, {}, TurnPostRequestBody>, res) => {
  const turnCount = (req.body.turnCount);
  const disc = toDisc(req.body.move.disc);
  const point = new Point(req.body.move.x, req.body.move.y);

  await resisterTurnUseCase.run(turnCount, disc, point);

  res.status(201).end();
})
