if (require.main === module) {
  const dbCredentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
  };
  const { Client } = require("pg");

  const buildQueryExecutor = (client) => (query) =>
    db
      .query(query)
      .then(({ rows = [] }) => rows)
      .catch((err) => {
        console.error(err);
        console.error(err.stack);
      });

  const db = new Client(dbCredentials);

  db.connect();

  const main = async () => {
    const executeQuery = buildQueryExecutor(db);

    const dropTablesQueries = [
      `DROP TABLE IF EXISTS journals`,
      `DROP TABLE IF EXISTS strategies`,
      `DROP TABLE IF EXISTS users`,
    ];

    const createUsersTable = `CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "user_name" text,
    "email" text,
    "pass_word" text
  );`;

    const createStrategiesTable = `CREATE TABLE "strategies" (
    "strategy_id" SERIAL PRIMARY KEY,
    "user_id" int,
    "description" text,
    "name" text,
    "market_condition" text,
    "entry_conditions" text,
    "exit_conditions" text,
    "time_frames" text,
    "risk_per_trade" text,
    "risk_to_reward" text,
    "indicators" text
  );`;

    const createJournalsTable = `CREATE TABLE "journals" (
    "journal_id" SERIAL PRIMARY KEY,
    "user_id" int,
    "pair" text,
    "comments" text,
    "order_type" text,
    "pips_gained_lost" int,
    "img_link" text,
    "strategy_id" int
  );`;

    const relationshipQueries = [
      `ALTER TABLE "strategies" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");`,
      `ALTER TABLE "journals" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");`,
      `ALTER TABLE "journals" ADD FOREIGN KEY ("strategy_id") REFERENCES "strategies" ("strategy_id");`,
    ];

    try {
      dropTablesQueries.forEach(async (query) => {
        await executeQuery(query);
      });

      await executeQuery(createUsersTable);
      await executeQuery(createStrategiesTable);
      await executeQuery(createJournalsTable);

      relationshipQueries.forEach(async (query) => {
        await executeQuery(query);
      });

      await executeQuery(
        `insert into users (user_name, email, pass_word) values ('test_u','example@gmail.com','secure');`
      );
      await executeQuery(
        `insert into strategies (name, description, user_id) values ('testing strategy', 'this is a test', 1);`
      );
      await executeQuery(
        `insert into journals (pair, comments, user_id, strategy_id) values ('USDJPY','this is a test', 1, 1);`
      );

      console.log("Queries executed!");
    } catch (err) {
      console.error();
    }
    db.end();
  };

  main();
}
