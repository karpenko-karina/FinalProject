const express = require('express');
const data = require('./data.js');

const app = express();

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find( (x) =>x._id === req.params.id )
    if(product){
        res.send(product)
    }else{
        res.status(404).send({ message: 'Product Not Found' })
    }
})

app.get('/api/products', (req, res) => {
    res.send(data.products);
})

app.get('/', (req, res) => {
    res.send('Server is ready');
})

const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`Server at http://localhost:${port}`);
}) 