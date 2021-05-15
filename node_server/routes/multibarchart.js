const router = require('express').Router();
let MultiBarChart = require('../models/multibarchart.model.js');

router.route('/').get((req, res) => {
    MultiBarChart.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').put((req, res) => {
    const newMultiBarChart = new MultiBarChart(req.body);

    newMultiBarChart.save()
    .then(() => res.json('line data added!'))
    .catch(err => {res.status(500).json('Error: ' + err);
    console.log("Error is here")});
});

router.route('/delete/:id').delete((req, res) => {
    id = req.params.id;
    console.log(id)
    MultiBarChart.deleteOne({_id : id}).then(
        () => {
            res.send('Deleted')
        }
    )
})

router.route('/deleteall').delete((req, res) => {
    MultiBarChart.deleteMany({}).then(
        () => {
            res.send('Deleted')
        }
    )
})

module.exports = router;