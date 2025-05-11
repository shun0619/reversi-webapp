import mysql from 'mysql2/promise';
import config from "../config";



export async function connectionMySQL(){
  return await mysql.createConnection(config.db);
}