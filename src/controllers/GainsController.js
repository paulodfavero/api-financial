const mongoose = require("mongoose");
const requireDir = require("require-dir");

requireDir("../models");

const Gains = mongoose.model("Gains");

module.exports = {
  async listGains(req, res) {
    const { page = 1 } = req.query;
    try {
      const gains = await Gains.paginate({}, { page, limit: 100 });
      return res.json(gains);
    } catch (error) {
      return res.status(400).json(`THERE'S NO GAINS WHITH THIS ID -- ${error}`);
    }
  },
  async createGains(req, res) {
    try {
      const gains = await Gains.create(req.body);
      return res.json(gains);
    } catch (error) {
      return res.json(`ERROR TO CREATE GAINS -- ${error}`);
    }
  },
  async updateGains(req, res) {
    try {
      const gains = await Gains.findOneAndUpdate(req.body._id, req.body, {
        new: true
      });
      return res.json(gains);
    } catch (error) {
      return res.json(`ERROR -- ${error}`);
    }
  },
  async deleteGains(req, res) {
    try {
      await Gains.findByIdAndDelete(req.body._id);
      return res.json("delete");
    } catch (error) {
      return res.json(`ERROR -- ${error}`);
    }
  }
};
