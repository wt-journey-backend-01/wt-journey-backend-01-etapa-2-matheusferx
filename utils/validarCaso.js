const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function validarCasoCompleto(caso) {
  const errors = {};

  if (!caso.titulo) errors.titulo = "Campo 'titulo' é obrigatório";
  else if (typeof caso.titulo !== 'string') errors.titulo = "Campo 'titulo' deve ser uma string";

  if (!caso.descricao) errors.descricao = "Campo 'descricao' é obrigatório";
  else if (typeof caso.descricao !== 'string') errors.descricao = "Campo 'descricao' deve ser uma string";

  if (!caso.status) errors.status = "Campo 'status' é obrigatório";
  else if (!['aberto', 'solucionado'].includes(caso.status)) {
    errors.status = "O campo 'status' pode ser somente 'aberto' ou 'solucionado'";
  }

  if (!caso.agente_id) errors.agente_id = "Campo 'agente_id' é obrigatório";
  else if (typeof caso.agente_id !== 'string' || !uuidRegex.test(caso.agente_id)) {
    errors.agente_id = "Campo 'agente_id' deve ser uma string UUID válida";
  }

  if (Object.keys(errors).length > 0) {
    throw {
      status: 400,
      message: "Parâmetros inválidos",
      errors
    };
  }
}

module.exports = validarCasoCompleto;