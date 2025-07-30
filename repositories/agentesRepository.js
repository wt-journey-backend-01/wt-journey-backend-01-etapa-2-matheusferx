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

module.exports = {
  findAll,
  findById,
  create,
};
