const { save, get, getById, remove } = require('../../crud/index');
const { buscarUsers } = require('../Users/users.handler');
const tabela = "orders";

async function buscarOrders() {
    return await get(tabela);
}

async function buscarOrdersId(id) {
    return await getById(tabela, id);
}

async function cadastrarOrders(dado) {
    const usuario = (await buscarUsers()).find(e => e.id == dado.userId);
    const todosPedidos = await buscarOrders();

    if (usuario == undefined) {
        return { erro: "Erro ao encontrar usuário!" }
    }

    for (const pedido of todosPedidos) {
        if (pedido.userId == dado.userId) {
            if (pedido.status == "aberto") {
                return { erro: "Esse usuário já possui um pedido em aberto!" }
            }
        }
    }

    const pedido = {
        number: 1,
        userId: dado.userId,
        status: "aberto"
    }

    return await save(tabela, null, pedido);
}

async function editarOrders(id, dado) {
    return await save(tabela, id, dado);
}

async function deletarOrders(id) {
    const pedido = (await buscarOrders()).find(e => e.id == id);
    if (pedido == undefined) {
        return { erro: "Pedido não encontrado!" }
    }
    return await remove(tabela, id);
}

module.exports = {
    buscarOrders,
    buscarOrdersId,
    cadastrarOrders,
    editarOrders,
    deletarOrders
}