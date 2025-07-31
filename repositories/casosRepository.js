const { v4: uuidv4, validate, version } = require('uuid');

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
    casos[index] = { ...casos[index], ...data, id };
    return casos[index];
}

function partialUpdate(id, data) {
    const caso = getById(id);
    if (!caso) return null;
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) return null;
    casos[index] = { ...casos[index], ...data, id };
    return casos[index];
}

function remove(id) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) return false;
    casos.splice(index, 1);
    return true;
}

function isValidId(id) {
  return validate(id) && version(id) === 4;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    partialUpdate,
    remove,
    isValidId
};
