const router = require('express').Router();
let MultiLineGraph = require('../models/multilinegraph.model.js');

router.route('/').get((req, res) => {
    MultiLineGraph.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').put((req, res) => {
    const newMultiLineGraph = new MultiLineGraph(req.body);

    newMultiLineGraph.save()
    .then(() => res.json('line data added!'))
    .catch(err => {res.status(500).json('Error: ' + err);
    console.log("Error is here")});
});

router.route('/delete/:id').delete((req, res) => {
    id = req.params.id;
    console.log(id)
    MultiLineGraph.deleteOne({_id : id}).then(
        () => {
            res.send('Deleted')
        }
    )
})

router.route('/deleteall').delete((req, res) => {
    MultiLineGraph.deleteMany({}).then(
        () => {
            res.send('Deleted')
        }
    )
})

module.exports = router;