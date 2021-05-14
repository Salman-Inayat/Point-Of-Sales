const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MultiBarChartSchema = new Schema({
  label: [{ type: String }],
  bar1data: [
    {
      type: Number,
      required: true,
    },
  ],
  bar2data: [
    {
      type: Number,
      required: true,
    },
  ],
});

const MultiBarChart = mongoose.model("MultiBarChart", MultiBarChartSchema);

module.exports = MultiBarChart;
