const connection = require("../database/connection");

module.exports = {
  async listGains(req, res) {
    try {
      const gains = await connection("gains").select("*");
      return res.json(gains);
    } catch (error) {
      return res.status(400).json(`THERE'S NO GAINS WHITH THIS ID -- ${error}`);
    }
  },
  async createGains(req, res) {
    const { categoria, valor, sacado, parcelas, data, logo } = req.body;
    try {
      await connection("gains").insert({
        categoria,
        valor,
        sacado,
        parcelas,
        data,
        logo
      });
      return res.json({ categoria });
    } catch (error) {
      return res.json(`ERROR TO CREATE GAINS -- ${error}`);
    }
  },
  async updateGains(req, res) {
    const { id, categoria, valor, sacado, parcelas, data, logo } = req.body;
    try {
      await connection("gains")
        .update({
          categoria,
          valor,
          sacado,
          parcelas,
          data,
          logo
        })
        .where({ id });
      return res.json(`UPDATED`);
    } catch (error) {
      return res.json(`ERROR -- ${error}`);
    }
  }
  // async deleteGains(req, res) {
  //   const { id } = req.body;
  //   try {
  //     await connection("gains")
  //       .where({ id })
  //       .delete();
  //     return res.json("delete");
  //   } catch (error) {
  //     return res.json(`ERROR -- ${error}`);
  //   }
  // }
};
