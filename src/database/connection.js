const knex = require("knex");
const configuration = require("../../knexfile");

const env =
  process.env.NODE_ENV === "prod"
    ? configuration.production
    : configuration.development;
const connection = knex(env);

module.exports = connection;
