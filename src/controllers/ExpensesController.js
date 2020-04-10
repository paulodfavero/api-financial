// const connection = require("../database/connection");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const moment = require("moment-timezone");

requireDir("../models");
const Expenses = mongoose.model("Expenses");

module.exports = {
  async listExpenses(req, res) {
    const { page = 1 } = req.query;
    try {
      const expenses = await Expenses.paginate({}, { page, limit: 100 });
      return res.json(expenses);
    } catch (error) {
      return res
        .status(400)
        .json(`THERE'S NO expenses WHITH THIS ID -- ${error}`);
    }
  },
  async createExpenses(req, res) {
    const {
      name,
      category,
      value,
      partials,
      startDate,
      expensesType,
      limitDate
    } = req.body;
    let expenses = "";
    let limitDateInit = limitDate;
    try {
      for (let index = 0; index < partials && index <= 11; index++) {
        const newDate = moment(limitDateInit)
          .add(1, "M")
          .format("YYYY-MM-DD");
        const newPartials = partials - index;

        const data = {
          name,
          category,
          value,
          partials: newPartials,
          startDate,
          expensesType,
          limitDate: limitDateInit
        };
        expenses = await Expenses.create(data);
        limitDateInit = newDate;
      }
      return res.json(expenses);
    } catch (error) {
      return res.status(400).json(`ERROR TO CREATE EXPENSES -- ${error}`);
    }
  },
  async updateExpenses(req, res) {
    try {
      const expenses = await Expenses.findOneAndUpdate(req.param.id, req.body, {
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
