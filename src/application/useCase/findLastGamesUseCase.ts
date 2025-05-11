import { FindLastGamesMySQLQueryService } from "../../infrastructure/query/findLastGamesMySQLQueryService";
import { FindLastGamesQueryModel } from "../query/findLastGamesQueryService";
import { connectionMySQL } from "../../infrastructure/connection";

const FIND_COUNT = 10;

export class FindLastGamesUseCase {
  constructor(private _queryService: FindLastGamesMySQLQueryService){}

  
  async run(): Promise<FindLastGamesQueryModel[]> {
    const conn = await connectionMySQL();
    try {
      return await this._queryService.query(conn, FIND_COUNT);
    } finally {
      conn.end();
    }

    
  
  }
}

