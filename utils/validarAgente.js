const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
const cargosPermitidos = ["inspetor", "delegado", "escrivao", "investigador"];

function validarAgenteCompleto(agente) {
  const errors = {};

  if (!agente.nome) errors.nome = "Campo nome é obrigatório";
  else if (typeof agente.nome !== 'string') errors.nome = "Campo nome deve ser uma string";

  if (!agente.dataDeIncorporacao) errors.dataDeIncorporacao = "Campo dataDeIncorporacao é obrigatório";
  else if (typeof agente.dataDeIncorporacao !== 'string' || !dataRegex.test(agente.dataDeIncorporacao)) {
    errors.dataDeIncorporacao = "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD'";
  }

  if (!agente.cargo) errors.cargo = "Campo cargo é obrigatório";
  else if (typeof agente.cargo !== 'string' || !cargosPermitidos.includes(agente.cargo.toLowerCase())) {
    errors.cargo = `Campo cargo deve ser um dos seguintes: ${cargosPermitidos.join(', ')}`;
  }

  // Se houver erros, lança o objeto personalizado
  if (Object.keys(errors).length > 0) {
    throw {
      status: 400,
      message: "Parâmetros inválidos",
      errors
    };
  }
}

module.exports = validarAgenteCompleto;