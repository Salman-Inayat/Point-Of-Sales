const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MultiLineGraphSchema = new Schema({
  label: [{ type: String }],
  line1data: [
    {
      type: Number,
      required: true,
    },
  ],
  line2data: [
    {
      type: Number,
      required: true,
    },
  ],
  line3data: [
    {
      type: Number,
      required: true,
    },
  ],
  line4data: [
    {
      type: Number,
      required: true,
    },
  ],
});

const MultiLineGraph = mongoose.model("MultiLineGraph", MultiLineGraphSchema);

module.exports = MultiLineGraph;
