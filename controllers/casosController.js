const casosRepository = require('../repositories/casosRepository');
const agentesRepository  = require('../repositories/agentesRepository');

function isValidStatus(status) {
  return ['aberto', 'solucionado'].includes(status);
}

function validarCasoCompleto({ titulo, descricao, status, agente_id }) {
  const camposFaltando = [];
  if (!titulo) camposFaltando.push('titulo');
  if (!descricao) camposFaltando.push('descricao');
  if (!status) camposFaltando.push('status');
  if (!agente_id) camposFaltando.push('agente_id');

  if (camposFaltando.length > 0) {
    throw { status: 400, message: `Campos obrigatórios faltando: ${camposFaltando.join(', ')}` };
  }

  if (!isValidStatus(status)) {
    throw { status: 400, message: 'Status inválido' };
  }

  if (!agentesRepository.isValidId(agente_id)) {
    throw { status: 400, message: 'agente_id inválido' };
  }

  const agenteExiste = agentesRepository.findById(agente_id);
  if (!agenteExiste) {
    throw { status: 404, message: 'Agente não encontrado' };
  }
}

function getAllCasos(req, res, next) {
  try {
    let casos = casosRepository.getAll();
    const { status, agente_id, keyword } = req.query;

    if (status) {
      if (!['aberto', 'solucionado'].includes(status)) {
        throw { status: 400, message: 'Status inválido para filtro' };
      }
      casos = casos.filter(caso => caso.status === status);
    }

    if (agente_id) {
      if (!agentesRepository.isValidId(agente_id)) {
        throw { status: 400, message: 'agente_id inválido para filtro' };
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

    if (!casosRepository.isValidId(id)) {
      throw { status: 400, message: "ID inválido" };
    }

    const caso = casosRepository.getById(id);
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
    const novo = casosRepository.create(req.body);
    return res.status(201).json(novo);
  } catch (err) {
    next(err);
  }
}

function updateCaso(req, res, next) {
  try {
    const id = req.params.id;

    if (!casosRepository.isValidId(id)) {
      throw { status: 400, message: "ID inválido" };
    }

    validarCasoCompleto(req.body);
    const atualizado = casosRepository.update(id, req.body);
    if (!atualizado) throw { status: 404, message: 'Caso não encontrado' };
    return res.json(atualizado);
  } catch (err) {
    next(err);
  }
}

function partialUpdateCaso(req, res, next) {
  try {
    const id = req.params.id;

    if (!casosRepository.isValidId(id)) {
      throw { status: 400, message: "ID inválido" };
    }

    const { status, agente_id } = req.body;

    if (status && !isValidStatus(status)) {
      throw { status: 400, message: 'Status inválido' };
    }

    if (agente_id) {
      if (!agentesRepository.isValidId(agente_id)) {
        throw { status: 400, message: 'agente_id inválido' };
      }
      const agenteExiste = agentesRepository.findById(agente_id);
      if (!agenteExiste) {
        throw { status: 404, message: 'Agente não encontrado' };
      }
    }
    const atualizado = casosRepository.partialUpdate(id, req.body);
    if (!atualizado) throw { status: 404, message: 'Caso não encontrado' };
    return res.json(atualizado);
  } catch (err) {
    next(err);
  }
}

function deleteCaso(req, res, next) {
  try {
    const id = req.params.id;

    if (!casosRepository.isValidId(id)) {
      throw { status: 400, message: "ID inválido" };
    }

    const sucesso = casosRepository.remove(id);
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
