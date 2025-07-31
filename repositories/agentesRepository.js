const { v4: uuidv4,  validate, version } = require('uuid');

let agentes = [];

function findAll() {
  return agentes;
}

function findById(id) {
  return agentes.find(agente => agente.id === id);
}

function create(data) {
  if (!data.nome || !data.matricula) {
    throw new Error("Campos obrigatórios: nome, matricula");
  }

  const novoAgente = {
    id: uuidv4(),
    nome: data.nome,
    matricula: data.matricula,
    especialidade: data.especialidade || null,
  };

  agentes.push(novoAgente);
  return novoAgente;
}

function update(id, data) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index === -1) return null;

  if (!data.nome || !data.matricula) {
    throw new Error("Campos obrigatórios: nome, matricula");
  }

  const agenteAtualizado = {
    id,
    nome: data.nome,
    matricula: data.matricula,
    especialidade: data.especialidade || null,
  };

  agentes[index] = agenteAtualizado;
  return agenteAtualizado;
}

function partialUpdate(id, data) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index === -1) return null;

  const agenteAtual = agentes[index];
  const agenteAtualizado = {
    ...agenteAtual,
    ...data,
    id
  };

  agentes[index] = agenteAtualizado;
  return agenteAtualizado;
}

function remove(id) {
  const index = agentes.findIndex(agente => agente.id === id);
  if (index === -1) return false;

  agentes.splice(index, 1);
  return true;
}

function isValidId(id) {
  return validate(id) && version(id) === 4;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  partialUpdate,
  remove,
  isValidId,
};
