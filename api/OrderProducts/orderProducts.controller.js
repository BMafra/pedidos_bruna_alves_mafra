const express = require('express');
const router = express.Router();
const orderPrductsHandler = require('./orderProducts.handler');

router.get('/', async (req, res) => {
    res.json(await orderPrductsHandler.buscarOrderProducts());
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await orderPrductsHandler.buscarOrderProductsId(id));
});

router.post('/', async (req, res) => {
    const dado = req.body;
    res.json(await orderPrductsHandler.cadastrarOrderProducts(dado));
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const dado = req.body;
    res.json(await orderPrductsHandler.editarOrderProducts(id, dado));
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await orderPrductsHandler.deletarOrderProducts(id));
});

module.exports = router;