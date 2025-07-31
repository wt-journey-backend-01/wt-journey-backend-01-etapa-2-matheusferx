const repo = require('../repositories/casosRepository');
const agentesRepo = require('../repositories/agentesRepository');

function isValidStatus(status) {
  return ['aberto', 'solucionado'].includes(status);
}

function validarCasoCompleto({ titulo, descricao, status, agente_id }) {
  if (!titulo || !descricao || !status || !agente_id) {
    return 'Campos obrigatórios faltando';
  }

  if (!isValidStatus(status)) {
    return 'Status inválido';
  }

  if (!agentesRepo.isValidId(agente_id)) {
    return 'agente_id inválido';
  }

  const agenteExiste = agentesRepo.findById(agente_id);
  if (!agenteExiste) {
    return 'Agente não encontrado';
  }

  return null;
}

function getAll(req, res) {
  const casos = repo.getAll();
  return res.json(casos);
}

function getById(req, res) {
  const caso = repo.getById(req.params.id);
  if (!caso) return res.status(404).json({ erro: 'Caso não encontrado' });
  return res.json(caso);
}

function create(req, res) {
  const erroValidacao = validarCasoCompleto(req.body);
  if (erroValidacao) return res.status(400).json({ erro: erroValidacao });

  const novo = repo.create(req.body);
  return res.status(201).json(novo);
}

function update(req, res) {
  const erroValidacao = validarCasoCompleto(req.body);
  if (erroValidacao) return res.status(400).json({ erro: erroValidacao });

  const atualizado = repo.update(req.params.id, req.body);
  if (!atualizado) return res.status(404).json({ erro: 'Caso não encontrado' });

  return res.json(atualizado);
}

function partialUpdate(req, res) {
  const { status, agente_id } = req.body;

  if (status && !isValidStatus(status)) {
    return res.status(400).json({ erro: 'Status inválido' });
  }

  if (agente_id) {
    if (!agentesRepo.isValidId(agente_id)) {
      return res.status(400).json({ erro: 'agente_id inválido' });
    }
    const agenteExiste = agentesRepo.findById(agente_id);
    if (!agenteExiste) {
      return res.status(404).json({ erro: 'Agente não encontrado' });
    }
  }

  const atualizado = repo.partialUpdate(req.params.id, req.body);
  if (!atualizado) return res.status(404).json({ erro: 'Caso não encontrado' });

  return res.json(atualizado);
}

function remove(req, res) {
  const sucesso = repo.remove(req.params.id);
  if (!sucesso) return res.status(404).json({ erro: 'Caso não encontrado' });
  return res.status(204).send();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  partialUpdate,
  remove,
};
