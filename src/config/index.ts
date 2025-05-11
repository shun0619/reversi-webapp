import dotenv from 'dotenv';
dotenv.config(); 

export default {
  /**
   * APIサーバーのPORT番号
   */
  port: parseInt(process.env.PORT!, 10),

  /**
   * databaseの設定
   */
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};