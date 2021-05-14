const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LineGraphSchema = new Schema({
  label: [{ type: String }],
  data: [{
    type: Number,
    required: true,
  }],
});

const LineGraph = mongoose.model("LineGraph", LineGraphSchema);

module.exports = LineGraph;
