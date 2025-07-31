const { v4: uuidv4 } = require('uuid');

let casos = [];

function getAll() {
    return casos;
}

function getById(id) {
    return casos.find(caso => caso.id === id);
}

function create(data) {
    const novoCaso = { id: uuidv4(), ...data };
    casos.push(novoCaso);
    return novoCaso;
}

function update(id, data) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) return null;
    casos[index] = { id, ...data };
    return casos[index];
}

function partialUpdate(id, data) {
    const caso = getById(id);
    if (!caso) return null;
    Object.assign(caso, data);
    return caso;
}

function remove(id) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) return false;
    casos.splice(index, 1);
    return true;
}

function isValidId(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    partialUpdate,
    remove,
    isValidId // ← agora exportando corretamente
};
