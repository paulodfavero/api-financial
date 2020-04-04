const knex = require("knex");
const configuration = require("../../knexfile");

const env =
  process.env.NODE_ENV === "prod"
    ? configuration.development
    : configuration.production;
const connection = knex(env);
console.log("LOCAL", env);
module.exports = connection;
