const knex = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.INFO_DB,
    ssl: { rejectUnauthorized: false },
  },
});

module.exports = knex;
