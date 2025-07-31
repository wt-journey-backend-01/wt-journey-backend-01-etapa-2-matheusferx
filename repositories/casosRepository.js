const { v4: uuidv4 } = require('uuid');
const { validate, version } = require('uuid');

let casos = [];

function getAll() {
    return casos;
}

function getById(id) {
    return casos.find(caso => caso.id === id);
}

function create({ titulo, descricao, status, agente_id }) {
  const novo = {
    id: uuidv4(),
    titulo,
    descricao,
    status,
    agente_id,
  };
  casos.push(novo);
  return novo;
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
