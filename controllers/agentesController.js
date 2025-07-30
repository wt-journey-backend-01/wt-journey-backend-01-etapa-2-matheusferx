const agentesRepository = require('../repositories/agentesRepository');

function getAllAgentes(req, res) {
  const agentes = agentesRepository.findAll();
  res.status(200).json(agentes);
}

function getAgenteById(req, res) {
  const id = req.params.id;
  const agente = agentesRepository.findById(id);

  if (!agente) {
    return res.status(404).json({ message: "Agente não encontrado" });
  }

  res.status(200).json(agente);
}

function createAgente(req, res) {
  const novoAgente = req.body;

  try {
    const agenteCriado = agentesRepository.create(novoAgente);
    res.status(201).json(agenteCriado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// (Você também pode fazer update completo, parcial e delete)

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
};
