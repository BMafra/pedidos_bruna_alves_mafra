const { save, get, getById, remove } = require('../../crud/index');
const tabela = "users";

async function buscarUsers(){
    return await get(tabela);
}

async function buscarUsersId(id){
    return await getById(tabela, id);
}

async function cadastrarUsers(dado){
    return await save(tabela, null, dado);
}

async function editarUsers(id, dado){
    return await save(tabela, id, dado);
}

async function deletarUsers(id){
    const todosUsuarios = await buscarUsers();

    for(const usuario of todosUsuarios){
        if(usuario.id != id){
            return {erro: "Erro ao encontrar usuário"}
        }
    } 

    return await remove(tabela, id);
}

module.exports = {
    buscarUsers,
    buscarUsersId,
    cadastrarUsers,
    editarUsers,
    deletarUsers
}