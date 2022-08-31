const { save, get, getById, remove } = require('../../crud/index');
const { buscarProducts } = require("../Products/products.handler");
const { buscarOrders } = require('../Orders/orders.handler');
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

async function fecharOrders(id) {
    const pedido = (await buscarOrderProducts()).filter(e => e.orderId == id);
    for(const pedidoId of pedido){
        console.log(pedidoId);
        if(pedidoId.productId == ""){
            return { erro: "Pedido sem nenhum produto!"}
        }
    }
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