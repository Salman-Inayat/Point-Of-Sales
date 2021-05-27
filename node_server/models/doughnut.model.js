const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DoughnutChartSchema = new Schema({
  label: [{ type: String }],
  data: [{
    type: Number,
    required: true,
  }],
});

const DoughnutChart = mongoose.model("DoughnutChart", DoughnutChartSchema);

module.exports = DoughnutChart;
