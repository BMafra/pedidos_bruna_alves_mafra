const { save, get, getById, remove } = require('../../crud/index');
const tabela = "orders";

async function buscarOrders(){
    return await get(tabela);
}

async function buscarOrdersId(id){
    return await getById(tabela, id);
}

async function cadastrarOrders(dado){
    return await save(tabela, null, dado);
}

async function editarOrders(id, dado){
    return await save(tabela, id, dado);
}

async function deletarOrders(id){
    return await remove(tabela, id);
}

module.exports = {
    buscarOrders, 
    buscarOrdersId,
    cadastrarOrders,
    editarOrders,
    deletarOrders
}