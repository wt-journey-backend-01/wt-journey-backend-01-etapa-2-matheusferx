const { v4: uuidv4 } = require('uuid');

let Agentes = [
  {
    "id": "401bccf5-cf9e-489d-8412-446cd169a0f1",
    "nome": "Rommel Carneiro",
    "dataDeIncorporacao": "1992/10/04",
    "cargo": "delegado"
  },
  
]

function findAll() {
  return Agentes
}

function findById(id) {
  return Agentes.find(agente => agente.id === id);
}

function create(agente) {
  const agenteCriado = { id: uuidv4(), ...agente };
  Agentes.push(agenteCriado);
  return agenteCriado;
}

function update(id, dadosAtualizados) {
  const index = Agentes.findIndex(agente => agente.id === id);
  if (index !== -1) {
    Agentes[index] = { ...Agentes[index], ...dadosAtualizados };
    return Agentes[index];
  }
  return null;
}

function partialUpdate(id, dadosParciais) {
  const index = Agentes.findIndex(agente => agente.id === id);
  if (index !== -1) {
    Agentes[index] = { ...Agentes[index], ...dadosParciais };
    return Agentes[index];
  }
  return null;
}

function remove(id) {
  const index = Agentes.findIndex(agente => agente.id === id);
  if (index !== -1) {
    Agentes.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  partialUpdate,
  remove
}
