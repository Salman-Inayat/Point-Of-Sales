const router = require('express').Router();
let Customer = require('../models/customer.model');

router.route('/').get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(500).json('Error: '+ err));
});

router.route('/add').post((req, res) => {
    const label = req.body.label;
    const descriptor = req.body.descriptor;
    //const age = Number(req.body.age);
    console.log(label,descriptor)
    const newCustomer = new Customer({
      label,
      descriptor
      //age,
    });

    newCustomer.save()
    .then(() => res.json('Customer added!'))
    .catch(err => {res.status(500).json('Error: ' + err);console.log("Error is here")});
});

router.route('/:id').get((req, res) => {
  Customer.findById(req.params.id)
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/customer/update/:id').post((req, res) => {
  Customer.findById(req.params.id)
    .then(exercise => {
      customer.label = req.body.username;
      customer.descriptor = req.body.description;
      //customer.age = Number(req.body.duration);

      customer.save()
        .then(() => res.json('Customer updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(500).json('Error: ' + err));
});

module.exports = router;