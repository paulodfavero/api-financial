// const connection = require("../database/connection");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

requireDir("../models");
const Expenses = mongoose.model("Expenses");

module.exports = {
  async listExpenses(req, res) {
    const { page = 1 } = req.query;
    try {
      const expenses = await Expenses.paginate({}, { page, limit: 10 });
      return res.json(expenses);
    } catch (error) {
      return res
        .status(400)
        .json(`THERE'S NO expenses WHITH THIS ID -- ${error}`);
    }
  },
  async createExpenses(req, res) {
    try {
      const expenses = await Expenses.create(req.body);
      return res.json(expenses);
    } catch (error) {
      return res.json(`ERROR TO CREATE EXPENSES -- ${error}`);
    }
  },
  async updateExpenses(req, res) {
    try {
      const expenses = await Expenses.findOneAndUpdate(req.body._id, req.body, {
        new: true
      });
      return res.json(expenses);
    } catch (error) {
      return res.json(`ERROR -- ${error}`);
    }
  },
  async deleteExpenses(req, res) {
    const { _id } = req.body;
    try {
      await Expenses.findByIdAndDelete(_id);
      return res.json("delete");
    } catch (error) {
      return res.json(`ERROR -- ${error}`);
    }
  }
};
