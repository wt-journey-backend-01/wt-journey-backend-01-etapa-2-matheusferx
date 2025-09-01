const agentesRepository = require('../repositories/agentesRepository');
const validarAgenteCompleto = require('../utils/validarAgente');

function getAllAgentes(req, res) {
  try {
    let agentes = agentesRepository.findAll();
    const { cargo, sort } = req.query;

    if (cargo) {
      agentes = agentes.filter(agente => agente.cargo === cargo);
    }

    if (sort === 'dataDeIncorporacao') {
      agentes = agentes.sort((a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao));
    } else if (sort === '-dataDeIncorporacao') {
      agentes = agentes.sort((a, b) => new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao));
    }

    return res.status(200).json(agentes);
  } catch (error) {
    console.error('Erro ao buscar agentes:', error);
    res.status(500).json({ error: 'Erro ao buscar agentes' });
  }
}

function getAgenteById(req, res) {
  const { id } = req.params;
  const agente = agentesRepository.findById(id);
  if (agente) {
    res.status(200).json(agente);
  } else {
    res.status(404).json({ error: 'Agente não encontrado' });
  }
}

function createAgente(req, res) {
  try {
    validarAgenteCompleto(req.body);
    const agenteCriado = agentesRepository.create(req.body);
    res.status(201).json(agenteCriado);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(error.status || 400).json(error);
    }
    console.error('Erro ao criar agente:', error);
    res.status(500).json({ error: 'Erro ao criar agente' });
  }
}

function updateAgente(req, res) {
  const { id } = req.params;
  const dadosAtualizados = { ...req.body };
  if ('id' in dadosAtualizados) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors: { id: "Não é permitido alterar o campo 'id' do agente." }
    });
  }

  try {
    validarAgenteCompleto(dadosAtualizados);
    const agenteAtualizado = agentesRepository.update(id, dadosAtualizados);
    if (agenteAtualizado) {
      res.status(200).send(agenteAtualizado);
    } else {
      res.status(404).send({ error: 'Agente não encontrado' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(error.status || 400).json(error);
    }
    console.error('Erro ao atualizar agente:', error);
    res.status(500).send({ error: 'Erro ao atualizar agente' });
  }
}

function partialUpdateAgente(req, res) {
  const { id } = req.params;
  const dadosParciais = { ...req.body };
  if ('id' in dadosParciais) {
    return res.status(400).json({
      status: 400,
      message: "Parâmetros inválidos",
      errors: { id: "Não é permitido alterar o campo 'id' do agente." }
    });
  }

  try {
    const agenteAtualizado = agentesRepository.partialUpdate(id, dadosParciais);
    if (agenteAtualizado) {
      res.status(200).send(agenteAtualizado);
    } else {
      res.status(404).send({ error: 'Agente não encontrado' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(error.status || 400).json(error);
    }
    console.error('Erro ao atualizar agente:', error);
    res.status(500).send({ error: 'Erro ao atualizar agente' });
  }
}

function deleteAgente(req, res) {
  const { id } = req.params;
  try {
    const agenteDeletado = agentesRepository.remove(id);
    if (agenteDeletado) {
      res.status(204).send();
    } else {
      res.status(404).send({ error: 'Agente não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar agente:', error);
    res.status(500).send({ error: 'Erro ao deletar agente' });
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