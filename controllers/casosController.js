const repo = require('../repositories/casosRepository');
const agentesRepo = require('../repositories/agentesRepository');

function isValidStatus(status) {
  return ['aberto', 'solucionado'].includes(status);
}

function validarCasoCompleto({ titulo, descricao, status, agente_id }) {
  if (!titulo || !descricao || !status || !agente_id) {
    throw { status: 400, message: 'Campos obrigatórios faltando' };
  }

  if (!isValidStatus(status)) {
    throw { status: 400, message: 'Status inválido' };
  }

  if (!agentesRepo.isValidId(agente_id)) {
    throw { status: 400, message: 'agente_id inválido' };
  }

  const agenteExiste = agentesRepo.findById(agente_id);
  if (!agenteExiste) {
    throw { status: 404, message: 'Agente não encontrado' };
  }
}

function getAllCasos(req, res, next) {
  try {
    let casos = repo.getAll();
    const { status } = req.query;

    if (status) {
      if (!['aberto', 'solucionado'].includes(status)) {
        return res.status(400).json({ error: 'Status inválido para filtro' });
      }
      casos = casos.filter(caso => caso.status === status);
    }

    if (agente_id) {
      if (!agentesRepo.isValidId(agente_id)) {
        return res.status(400).json({ error: 'agente_id inválido para filtro' });
      }
      casos = casos.filter(caso => caso.agente_id === agente_id);
    }

    if (keyword) {
      const lower = keyword.toLowerCase();
      casos = casos.filter(caso =>
        caso.titulo?.toLowerCase().includes(lower) ||
        caso.descricao?.toLowerCase().includes(lower)
      );
    }

    return res.json(casos);
  } catch (err) {
    next(err);
  }
}

function getCasoPorId(req, res, next) {
  try {
    const id = req.params.id;

    if (!repo.isValidId(id)) {
      throw { status: 400, message: "ID inválido" };
    }

    const caso = repo.getById(id);
    if (!caso) {
      throw { status: 404, message: "Caso não encontrado" };
    }

    return res.json(caso);
  } catch (err) {
    next(err);
  }
}

function createCaso(req, res, next) {
  try {
    validarCasoCompleto(req.body);
    const novo = repo.create(req.body);
    return res.status(201).json(novo);
  } catch (err) {
    next(err);
  }
}

function updateCaso(req, res, next) {
  try {
    const id = req.params.id;

    if (!repo.isValidId(id)) {
      throw { status: 400, message: "ID inválido" };
    }

    validarCasoCompleto(req.body);
    const atualizado = repo.update(id, req.body);
    if (!atualizado) throw { status: 404, message: 'Caso não encontrado' };
    return res.json(atualizado);
  } catch (err) {
    next(err);
  }
}

function partialUpdateCaso(req, res, next) {
  try {
    const id = req.params.id;

    if (!repo.isValidId(id)) {
      throw { status: 400, message: "ID inválido" };
    }

    const { status, agente_id } = req.body;

    if (status && !isValidStatus(status)) {
      throw { status: 400, message: 'Status inválido' };
    }

    if (agente_id) {
      if (!agentesRepo.isValidId(agente_id)) {
        throw { status: 400, message: 'agente_id inválido' };
      }
      const agenteExiste = agentesRepo.findById(agente_id);
      if (!agenteExiste) {
        throw { status: 404, message: 'Agente não encontrado' };
      }
    }
    const atualizado = repo.partialUpdate(id, req.body);
    if (!atualizado) throw { status: 404, message: 'Caso não encontrado' };
    return res.json(atualizado);
  } catch (err) {
    next(err);
  }
}

function deleteCaso(req, res, next) {
  try {
    const id = req.params.id;

    if (!repo.isValidId(id)) {
      throw { status: 400, message: "ID inválido" };
    }

    const sucesso = repo.remove(id);
    if (!sucesso) throw { status: 404, message: 'Caso não encontrado' };
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllCasos,
  getCasoPorId,
  createCaso,
  updateCaso,
  partialUpdateCaso,
  deleteCaso,
};
