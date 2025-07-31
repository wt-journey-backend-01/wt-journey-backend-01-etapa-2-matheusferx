const agentesRepository = require('../repositories/agentesRepository');

function getAllAgentes(req, res, next) {
  try {
    let agentes = agentesRepository.findAll();
    const { especialidade, orderBy } = req.query;

    // Filtro por especialidade
    if (especialidade) {
      agentes = agentes.filter(a => a.especialidade === especialidade);
    }

    // Ordenação por data de incorporação
    if (orderBy === 'data_incorporacao') {
      agentes = agentes.sort((a, b) => {
        const dateA = a.data_incorporacao ? new Date(a.data_incorporacao) : new Date(0);
        const dateB = b.data_incorporacao ? new Date(b.data_incorporacao) : new Date(0);
        return dateA - dateB;
      });
    } else if (orderBy === '-data_incorporacao') {
      agentes = agentes.sort((a, b) => {
        const dateA = a.data_incorporacao ? new Date(a.data_incorporacao) : new Date(0);
        const dateB = b.data_incorporacao ? new Date(b.data_incorporacao) : new Date(0);
        return dateB - dateA;
      });
    }

    return res.status(200).json(agentes);
  } catch (error) {
    next(error);
  }
}

function getAgenteById(req, res, next) {
  try {
    const id = req.params.id;

    if (!agentesRepository.isValidId(id)) {
      throw { status: 400, message: "ID de agente inválido" };
    }

    const agente = agentesRepository.findById(id);
    if (!agente) {
      throw { status: 404, message: "Agente não encontrado" };
    }

    return res.status(200).json(agente);
  } catch (error) {
    next(error);
  }
}

function createAgente(req, res, next) {
  try {
    const { nome, matricula, especialidade } = req.body;

    if (!nome || !matricula) {
      throw { status: 400, message: 'Campos obrigatórios: nome, matricula' };
    }

    const novoAgente = agentesRepository.create({ nome, matricula, especialidade });
    return res.status(201).json(novoAgente);
  } catch (error) {
    next(error);
  }
}

function updateAgente(req, res, next) {
  try {
    const id = req.params.id;

    if (!agentesRepository.isValidId(id)) {
      throw { status: 400, message: "ID de agente inválido" };
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
      throw { status: 400, message: "ID de agente inválido" };
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
      throw { status: 400, message: "ID de agente inválido" };
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
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  partialUpdateAgente,
  deleteAgente
};