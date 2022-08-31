const express = require('express');
const router = express.Router();
const orderProductsHandler = require('./orderProducts.handler');

router.get('/', async (req, res) => {
    res.json(await orderProductsHandler.buscarOrderProducts());
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await orderProductsHandler.buscarOrderProductsId(id));
});

router.post('/', async (req, res) => {
    const dado = req.body;
    res.json(await orderProductsHandler.cadastrarOrderProducts(dado));
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const dado = req.body;
    res.json(await orderProductsHandler.editarOrderProducts(id, dado));
});

router.put('/closeOrder/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await orderProductsHandler.fecharOrders(id));
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await orderProductsHandler.deletarOrderProducts(id));
});

module.exports = router;