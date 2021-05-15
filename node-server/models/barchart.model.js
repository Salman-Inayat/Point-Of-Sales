const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BarChartSchema = new Schema({
  label: [{ type: String }],
  data: [{
    type: Number,
    required: true,
  }],
});

const BarChart = mongoose.model("BarChart", BarChartSchema);

module.exports = BarChart;
