const { save, get, getById, remove } = require('../../crud/index');
const tabela = "products";

async function buscarProducts(){
    return await get(tabela);
}

async function buscarProductsId(id){
    const todosProdutos = await buscarProducts();

    for(const produto of todosProdutos){
        if(produto.id != id){
            return {erro: "Erro ao encontrar produto!"}
        }
    } 
    
    return await getById(tabela, id);
}

async function cadastrarProducts(dado){
    return await save(tabela, null, dado);
}

async function editarProducts(id, dado){
    return await save(tabela, id, dado);
}

async function deletarProducts(id){
    const todosProdutos = await buscarProducts();

    for(const produto of todosProdutos){
        if(produto.id != id){
            return {erro: "Erro ao encontrar produto!"}
        }
    } 

    return await remove(tabela, id);
}

module.exports = {
    buscarProducts,
    buscarProductsId,
    cadastrarProducts,
    editarProducts,
    deletarProducts
}