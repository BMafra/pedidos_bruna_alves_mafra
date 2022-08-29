const { save, get, getById, remove } = require('../../crud/index');
const tabela = "products";

async function buscarProducts(){
    return await get(tabela);
}

async function buscarProductsId(id){
    return await getById(tabela, id);
}

async function cadastrarProducts(dado){
    return await save(tabela, null, dado);
}

async function editarProducts(id, dado){
    return await save(tabela, id, dado);
}

async function deletarProducts(id){
    return await remove(tabela, id);
}

module.exports = {
    buscarProducts,
    buscarProductsId,
    cadastrarProducts,
    editarProducts,
    deletarProducts
}