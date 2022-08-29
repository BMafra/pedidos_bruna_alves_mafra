const express = require('express');
const router = express.Router();
const ordersHandler = require('./orders.handler');

router.get('/', async (req, res) => {
    res.json(await ordersHandler.buscarOrders());
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await ordersHandler.buscarOrdersId(id));
});

router.post('/', async (req, res) => {
    const dado = req.body;
    res.json(await ordersHandler.cadastrarOrders(dado));
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const dado = req.body;
    res.json(await ordersHandler.editarOrders(id, dado));
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await ordersHandler.deletarOrders(id));
});

module.exports = router;