const express = require('express');
const fs = require('fs');
const cart = require('./cartRouter');
const app = express();

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/cart', cart);



app.get('/api/products', (req, res) => {
    fs.readFile('server/bd/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

//
// app.get('/api/cart', (req, res) => {
//     fs.readFile('server/bd/cart.json', 'utf-8', (err, data) => {
//         if (err) {
//             res.sendStatus(404, JSON.stringify({result: 0, text: err}));
//         } else {
//             res.send(data);
//         }
//     });
// });
//
// app.post('/api/cart', (req, res) => {
//     fs.readFile('server/bd/cart.json', 'utf-8', (err, data) => {
//         if (err) {
//             res.sendStatus(404, JSON.stringify({result: 0, text: err}));
//         } else {
//             let newCart = cart.add(JSON.parse(data),req);
//             fs.writeFile('server/bd/cart.json', newCart, err => {
//                 if (err) {
//                     res.sendStatus(404, JSON.stringify({result: 0, text: err}));
//                 } else{
//                     res.send(JSON.stringify({result: 1, text: "success"}));
//                 }
//                 })
//         }
//     });
// });

//app.get()
//app.post()
//app.put()
//app.delete()

// app.get('/', (req, res) => {
//     res.send('hello world');
// });
//
// app.get('/api/users/:id', (req, res) => {
//    // res.send(req.params.id);
//     res.send(req.query);
// });
app.listen(3000, () => console.log('Listen on port 3000...'));


