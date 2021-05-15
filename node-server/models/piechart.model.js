const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PieChartSchema = new Schema({
  label: [{ type: String }],
  data: [{
    type: Number,
    required: true,
  }],
});

const PieChart = mongoose.model("PieChart", PieChartSchema);

module.exports = PieChart;
