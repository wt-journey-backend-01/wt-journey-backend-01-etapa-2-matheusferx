const agentesRepository = require('../repositories/agentesRepository');

function updateAgente(req, res, next) {
  try {
    const id = req.params.id;

    if (!agentesRepository.isValidId(id)) {
      throw { status: 400, message: "ID inválido" };
    }

    const { nome, matricula, especialidade } = req.body;

    if (!nome || !matricula) {
      throw { status: 400, message: 'Campos obrigatórios: nome, matricula' };
    }

    const agenteAtualizado = agentesRepository.update(id, { nome, matricula, especialidade });

    if (!agenteAtualizado) {
      throw { status: 404, message: "Agente não encontrado" };
    }

    return res.status(200).json(agenteAtualizado);
  } catch (error) {
    next(error);
  }
}

function partialUpdateAgente(req, res, next) {
  try {
    const id = req.params.id;

    if (!agentesRepository.isValidId(id)) {
      throw { status: 400, message: "ID inválido" };
    }

    const data = req.body;

    const agenteAtualizado = agentesRepository.partialUpdate(id, data);

    if (!agenteAtualizado) {
      throw { status: 404, message: "Agente não encontrado" };
    }

    return res.status(200).json(agenteAtualizado);
  } catch (error) {
    next(error);
  }
}

function deleteAgente(req, res, next) {
  try {
    const id = req.params.id;

    if (!agentesRepository.isValidId(id)) {
      throw { status: 400, message: "ID inválido" };
    }

    const sucesso = agentesRepository.remove(id);

    if (!sucesso) {
      throw { status: 404, message: "Agente não encontrado" };
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateAgente,
  partialUpdateAgente,
  deleteAgente
};
