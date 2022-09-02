const { save, get, getById, remove } = require('../../crud/index');
const { buscarProducts } = require("../Products/products.handler");
const { buscarOrders, buscarOrdersId, editarOrders } = require('../Orders/orders.handler');
const tabela = "orderProducts";

async function buscarOrderProducts() {
    return await get(tabela);
}

async function buscarOrderProductsId(id) {
    return await getById(tabela, id);
}

async function cadastrarOrderProducts(dado) {
    const pedido = (await buscarOrders()).find(e => e.id == dado.orderId);
    const produtos = (await buscarProducts());
    const dadosProdutos = dado.productIds;

    if (pedido == undefined) {
        return { erro: "Pedido não encontrado!" }
    }

    for (const dadoProduto of dadosProdutos) {
        let encontrado = true;
        for (const produto of produtos) {
            if (dadoProduto.productId == produto.id) {
                encontrado = false;
            }
        }

        if (encontrado == true) {
            return { erro: "Produto(s) não encontrado(s)!" }
        }
    }

    for (const dadoProduto of dadosProdutos) {
        const novoProdutoPedido = {
            productId: dadoProduto.productId,
            quantity: dadoProduto.quantity,
            orderId: dado.orderId
        }
        await save(tabela, null, novoProdutoPedido);
    }
}

async function fecharOrders(idPedido) {
    const pedido = (await buscarOrders()).find(e => e.id == idPedido);
    if (pedido == undefined) {
        return { erro: "Pedido não encontrado!" }
    }

    const pedidosProdutos = (await buscarOrderProducts()).filter(e => e.orderId == idPedido);
    if (pedidosProdutos == [] || pedidosProdutos == undefined || pedidosProdutos == "") {
        return { erro: "Pedido sem produto!" };
    }

    if (pedido.status == "Fechado") {
        return { erro: "O pedido já está fechado!" }
    }

    const novoPedido = {
        number: pedido.number,
        userId: pedido.userId,
        status: "Fechado"
    }
    await editarOrders(idPedido, novoPedido);
}

async function editarOrderProducts(id, dado) {
    return await save(tabela, id, dado);
}

async function deletarOrderProducts(id) {
    return await remove(tabela, id);
}

module.exports = {
    buscarOrderProducts,
    buscarOrderProductsId,
    cadastrarOrderProducts,
    editarOrderProducts,
    fecharOrders,
    deletarOrderProducts
}