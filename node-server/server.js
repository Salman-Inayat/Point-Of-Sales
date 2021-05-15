const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const imageRouter = require('./routes/image');
const customerRouter = require('./routes/customer');
const lineGraphRouter = require('./routes/linegraph');
const barChartRouter = require('./routes/barchart');
const pieChartRouter = require('./routes/piechart');
const doughnutChartRouter = require('./routes/doughnut');
const multiBarChartRouter = require('./routes/multibarchart');
const multiLineGraphRouter = require('./routes/multilinegraph');


app.use('/image', imageRouter);
app.use('/customer', customerRouter);
app.use('/linegraph', lineGraphRouter);
app.use('/barchart', barChartRouter);
app.use('/piechart', pieChartRouter);
app.use('/doughnutchart', doughnutChartRouter);
app.use('/multibarchart', multiBarChartRouter);
app.use('/multilinegraph', multiLineGraphRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});