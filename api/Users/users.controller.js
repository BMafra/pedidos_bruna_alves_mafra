const express = require('express');
const router = express.Router();
const users = require('./users.handler');

router.get('/', async (req, res) => {
    res.json(await users.buscarUsers());
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await users.buscarUsersId(id));
});

router.post('/', async (req, res) => {
    const dado = req.body;
    res.json(await users.cadastrarUsers(dado));
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const dado = req.body;
    res.json(await users.editarUsers(id, dado));
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await users.deletarUsers(id));
});

module.exports = router;