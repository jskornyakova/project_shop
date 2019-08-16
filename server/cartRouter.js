const express = require('express');
const fs = require('fs');
const handle = require('./handle');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('server/bd/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

router.post('/', (req, res) => {
    handle(req, res, 'add', 'server/bd/userCart.json');
});

router.put('/:id', (req, res) => {
    handle(req, res, 'change', 'server/bd/userCart.json');
});

router.put('/:id', (req, res) => {
    handle(req, res, 'changeQuantity', 'server/bd/userCart.json');
});

router.delete('/:id', (req, res) => {
    handle(req, res, 'remove', 'server/bd/userCart.json');
});
module.exports = router;