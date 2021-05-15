const router = require('express').Router();
let DoughnutChart = require('../models/doughnut.model.js');

router.route('/').get((req, res) => {
    DoughnutChart.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').put((req, res) => {
    const label = req.body.label;
    const data = req.body.data;
    console.log(label,data)
    const newDoughnutChart = new DoughnutChart({
        label,
        data
    });

    newDoughnutChart.save()
    .then(() => res.json('line data added!'))
    .catch(err => {res.status(500).json('Error: ' + err);
    console.log("Error is here")});
});

router.route('/delete/:id').delete((req, res) => {
    id = req.params.id;
    console.log(id)
    DoughnutChart.deleteOne({_id : id}).then(
        () => {
            res.send('Deleted')
        }
    )
})



module.exports = router;