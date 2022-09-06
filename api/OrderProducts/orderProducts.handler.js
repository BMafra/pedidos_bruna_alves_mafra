const { save, get, getById, remove } = require('../../crud/index');
const { buscarProducts } = require("../Products/products.handler");
const { buscarOrders, editarOrders } = require('../Orders/orders.handler');
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

    if (pedido.status == "Fechado") {
        return { erro: "Você não pode adicionar ou retirar produtos em um pedido fechado!" }
    }

    for (const dadoProduto of dadosProdutos) {
        let encontrado = true;
        for (const produto of produtos) {
            if (dadoProduto.productId == produto.id) {
                encontrado = false;
            }
        }

        if (encontrado == true) {
            return { erro: "Produto não encontrado!" }
        }

        if (dadoProduto.quantity <= 0) { //deletar da tabela ????????????
            return { erro: "A quantidade do produto não pode ser igual a zero (0)." }
        }
    }

    for (const dadoProduto of dadosProdutos) {
        const novoProdutoPedido = {
            productIds: dadoProduto,
            orderId: dado.orderId
        }
        await save(tabela, null, novoProdutoPedido);
    }
}

async function fecharOrders(idPedido) {
    const pedido = (await buscarOrders()).find(e => e.id == idPedido);
    const pedidosProdutos = (await buscarOrderProducts()).filter(e => e.orderId == idPedido);

    if (pedido == undefined) {
        return { erro: "Pedido não encontrado!" }
    }

    if (pedidosProdutos == [] || pedidosProdutos == undefined || pedidosProdutos == "") {
        return { erro: "Pedido sem produto!" }
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
    const pedidoProduto = (await buscarOrderProducts()).find(e => e.id == id);
    const pedido = (await buscarOrders()).find(e => e.id == dado.orderId);

    if (pedidoProduto == undefined) {
        return { erro: "Erro ao encontrar 'orderProducts'" }
    }

    if (pedido == undefined) {
        return { erro: "Pedido não encontrado!" }
    }

    if (pedido.status == "Fechado") {
        return { erro: "Você não pode adicionar ou retirar produtos em um pedido fechado!" }
    }

    if (pedido.quantity <= 0) {
        return { erro: "A quantidade do produto não pode ser igual a zero (0)." }
    }

    if (pedidoProduto.productIds.productId == dado.productId) {
        const produtos = {
            productId: pedidoProduto.productIds.productId,
            quantity: (pedidoProduto.productIds.quantity + dado.productIds.quantity)
        }
        const novoProdutoPedido = {
            productIds: produtos,
            orderId: dado.orderId
        }
    }
    return await save(tabela, id, novoProdutoPedido);
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