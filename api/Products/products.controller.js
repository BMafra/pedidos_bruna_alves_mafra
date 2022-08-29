const express = require('express');
const router = express.Router();
const productsHandler = require('./products.handler');

router.get('/', async (req, res) => {
    res.json(await productsHandler.buscarProducts());
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await productsHandler.buscarProductsId(id));
});

router.post('/', async (req, res) => {
    const dado = req.body;
    res.json(await productsHandler.cadastrarProducts(dado));
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const dado = req.body;
    res.json(await productsHandler.editarProducts(id, dado));
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await productsHandler.deletarProducts(id));
});

module.exports = router;