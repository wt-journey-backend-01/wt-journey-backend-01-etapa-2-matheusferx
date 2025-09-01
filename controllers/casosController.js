const casosRepository = require('../repositories/casosRepository');
const validarCasoCompleto = require('../utils/validarCaso');

const getAllCasos = (req, res) => {
  try {
    let casos = casosRepository.findAll();
    const { agente_id, status } = req.query;

    if (agente_id) {
      casos = casos.filter(caso => caso.agente_id === agente_id);
    }

    if (status) {
      casos = casos.filter(caso => caso.status === status);
    }

    res.status(200).send(casos);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao buscar casos' });
    console.error(error);
  }
}

const getCasoById = (req, res) => {
  const { id } = req.params;
  const caso = casosRepository.findById(id);
  if (caso) {
    res.status(200).send(caso);
  } else {
    res.status(404).send({ error: 'Caso não encontrado' });
  }
};

const createCaso = (req, res) => {
  try {
    const casoData = { ...req.body };
    delete casoData.id; // Remove id enviado pelo usuário
    validarCasoCompleto(casoData);
    const casoCriado = casosRepository.create(casoData);
    res.status(201).send(casoCriado);
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message || 'Erro ao criar caso' });
  }
};

const updateCaso = (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;
  try {
    validarCasoCompleto(dadosAtualizados);
    const casoAtualizado = casosRepository.update(id, dadosAtualizados);
    if (casoAtualizado) {
      res.status(200).send(casoAtualizado);
    } else {
      res.status(404).send({ error: 'Caso não encontrado' });
    }
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message || 'Erro ao atualizar caso' });
  }
};

const partialUpdateCaso = (req, res) => {
  const { id } = req.params;
  const dadosParciais = req.body;
  try {
    const casoAtualizado = casosRepository.partialUpdate(id, dadosParciais);
    if (casoAtualizado) {
      res.status(200).send(casoAtualizado);
    } else {
      res.status(404).send({ error: 'Caso não encontrado' });
    }
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message || 'Erro ao atualizar caso' });
  }
};

const deleteCaso = (req, res) => {
  const { id } = req.params;
  const casoDeletado = casosRepository.remove(id);
  if (casoDeletado) {
    res.status(204).send();
  } else {
    res.status(404).send({ error: 'Caso não encontrado' });
  }
};

const searchCasos = (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).send({ error: 'Query de pesquisa não informada' });
  }
  const termo = q.toLowerCase();
  const casos = casosRepository.findAll().filter(caso =>
    caso.titulo.toLowerCase().includes(termo) ||
    caso.descricao.toLowerCase().includes(termo)
  );
  res.status(200).send(casos);
};

module.exports = { 
  getAllCasos,
  getCasoById,
  createCaso,
  updateCaso,
  partialUpdateCaso,
  deleteCaso,
  searchCasos
}