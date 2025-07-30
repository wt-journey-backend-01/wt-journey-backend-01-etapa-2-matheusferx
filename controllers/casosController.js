const repo = require('../repositories/casosRepository');

function isValidStatus(status) {
  return ['aberto', 'solucionado'].includes(status);
}

function getAll(req, res) {
  return res.json(repo.getAll());
}

function getById(req, res) {
  const caso = repo.getById(req.params.id);
  if (!caso) return res.status(404).json({ erro: 'Caso não encontrado' });
  return res.json(caso);
}

function create(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;
    if (!titulo || !descricao || !status || !agente_id) {
        return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
    }
    if (!isValidStatus(status)) {
        return res.status(400).json({ erro: 'Status inválido' });
    }

    const novo = repo.create({ titulo, descricao, status, agente_id });
    return res.status(201).json(novo);
}

function update(req, res) {
  const { titulo, descricao, status, agente_id } = req.body;
  if (!titulo || !descricao || !status || !agente_id) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
  }
  if (!isValidStatus(status)) {
    return res.status(400).json({ erro: 'Status inválido' });
  }

  const atualizado = repo.update(req.params.id, { titulo, descricao, status, agente_id });
  if (!atualizado) return res.status(404).json({ erro: 'Caso não encontrado' });
  return res.json(atualizado);
}

function partialUpdate(req, res) {
  const body = req.body;
  if (body.status && !isValidStatus(body.status)) {
    return res.status(400).json({ erro: 'Status inválido' });
  }

  const atualizado = repo.partialUpdate(req.params.id, body);
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
