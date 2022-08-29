const { save, get, getById, remove } = require('../../crud/index');
const tabela = "orderProducts"

async function buscarOrderProducts(){
    return await get(tabela);
}

async function buscarOrderProductsId(id){
    return await getById(tabela, id);
}

async function cadastrarOrderProducts(dado){
    return await save(tabela, null, dado);
}

async function editarOrderProducts(id, dado){
    return await save(tabela, id, dado);
}

async function deletarOrderProducts(id){
    return await remove(tabela, id);
}

module.exports = {
    buscarOrderProducts,
    buscarOrderProductsId,
    cadastrarOrderProducts,
    editarOrderProducts,
    deletarOrderProducts
}