let agentes = [];
let nextId = 1;

function findAll() {
  return agentes;
}

function findById(id) {
  return agentes.find(agente => agente.id === Number(id));
}

function create(data) {
  if (!data.nome || !data.matricula) {
    throw new Error("Campos obrigatórios: nome, matricula");
  }

  const novoAgente = {
    id: nextId++,
    nome: data.nome,
    matricula: data.matricula,
    especialidade: data.especialidade || null,
  };

  agentes.push(novoAgente);
  return novoAgente;
}

function update(id, data) {
  const index = agentes.findIndex(agente => agente.id === Number(id));
  if (index === -1) return null;

  if (!data.nome || !data.matricula) {
    throw new Error("Campos obrigatórios: nome, matricula");
  }

  const agenteAtualizado = {
    id: Number(id),
    nome: data.nome,
    matricula: data.matricula,
    especialidade: data.especialidade || null,
  };

  agentes[index] = agenteAtualizado;
  return agenteAtualizado;
}

function partialUpdate(id, data) {
  const index = agentes.findIndex(agente => agente.id === Number(id));
  if (index === -1) return null;

  const agenteAtual = agentes[index];
  const agenteAtualizado = {
    ...agenteAtual,
    ...data,
    id: Number(id)
  };

  agentes[index] = agenteAtualizado;
  return agenteAtualizado;
}

function remove(id) {
  const index = agentes.findIndex(agente => agente.id === Number(id));
  if (index === -1) return false;

  agentes.splice(index, 1);
  return true;
}

function isValidId(id) {
  return !isNaN(id) && Number.isInteger(Number(id)) && Number(id) > 0;
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
