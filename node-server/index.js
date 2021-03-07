const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const imgModel = require("./mongo-db/model");
const ObjectId = require("mongodb").ObjectId;
const path = require("path");
const fs = require("fs");
const app = express();

const hostname = "localhost";
const port = 5000;
const MONGO_URL = "mongodb://localhost:27017/images";

mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("connected");
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Set EJS as templating engine
app.set("view engine", "ejs");

imgModel.on(
  "error",
  console.error.bind(console, "MongoDB connection error: \n")
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  try {
    imgModel.find({}, (err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        res.render("imagesPage", { items: items });
      }
    });
  } catch {
    console.log("error is catched");
  }
});

app.get("/images/:id", function (req, res) {
  var r = req.params.id;

  imgModel.findOne({ _id: ObjectId(r) }, function (err, image) {
    if (err) return next(err);
    // res.setHeader('content-type', image.contentType);
    res.contentType(image.img.contentType);
    res.send(image.img.data);
    // res.send(image.img);
    console.log("recieved");
  });
});

app.post("/", upload.single("file"), (req, res, next) => {
  var obj = {
    barcode: req.body.barcode,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };

  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
      res.redirect("/");
      console.log("successfully received");
    }
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
