//const express = require('express');
const multer = require("multer");
const fs = require("fs");
//const app = express();
const router = require('express').Router();
let Image = require('../models/image.model.js');


var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.route('/').get((req, res) => {
  Image.find({})
    .then(items => console.log(items))
    .catch(err => res.status(500).json('Error: ' + err));
});

/*
router.route('/').get((req, res) => {
  try {
    Image.find({}, (err, items) => {
      if (err) {
        console.log(err);
        res.status(400).send("An error occurred", err);
      } else {
        res.render("imagesPage", { items: items });
      }
    });
  } catch {
    console.log("error is catched");
  }
});
*/

router.route('/:name').get((req, res) => {
  Image.findOne({name: req.params.name})
    .then(image => {
      res.contentType(image.img.contentType);
      res.send(image.img.data);
      console.log("recieved");
    })
    .catch(err => res.status(500).json('Error: ' + err));
});

/*
router.route('/images/:id').get((req, res) => {
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
*/

router.post("/", upload.single("file"), function(req, res, next) {
  var image = new Image({
      name: req.file.originalname
  });
  image.img.data = req.file.buffer;
  image.img.contentType = "image/jpeg";
  image.save(function(err) {
      if (err) { return next(err); }
      res.redirect("/");
  });
});

/*
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
*/

module.exports = router;
