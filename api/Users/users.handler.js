const { save, get, getById, remove } = require('../../crud/index');
const tabela = "users";

async function buscarUsers() {
    return await get(tabela);
}

async function buscarUsersId(id) {
    const usuario = await (await buscarUsers()).find(e => e.id == id);

    if (usuario == undefined) {
        return { erro: "Erro ao encontrar usuário" }
    }

    return await getById(tabela, id);
}

async function cadastrarUsers(dado) {
    return await save(tabela, null, dado);
}

async function editarUsers(id, dado) {
    return await save(tabela, id, dado);
}

async function deletarUsers(id) {
    const usuario = await (await buscarUsers()).find(e => e.id == id);

    if (usuario == undefined) {
        return { erro: "Erro ao encontrar usuário" }
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