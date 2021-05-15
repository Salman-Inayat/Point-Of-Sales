const router = require('express').Router();
let LineGraph = require('../models/linegraph.model.js');

router.route('/').get((req, res) => {
    LineGraph.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').put((req, res) => {
    const label = req.body.label;
    const data = req.body.data;
    console.log(label,data)
    const newLineGraph = new LineGraph({
        label,
        data
    });

    newLineGraph.save()
    .then(() => res.json('line data added!'))
    .catch(err => {res.status(500).json('Error: ' + err);
    console.log("Error is here")});
});

router.route('/delete/:id').delete((req, res) => {
    id = req.params.id;
    console.log(id)
    LineGraph.deleteOne({_id : id}).then(
        () => {
            res.send('Deleted')
        }
    )
})



module.exports = router;