const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
const cargosPermitidos = ["inspetor", "delegado", "escrivao", "investigador"];

function validarAgenteCompleto(agente) {
  const errors = {};

  if (!agente.nome) errors.nome = "Campo nome é obrigatório";
  else if (typeof agente.nome !== 'string') errors.nome = "Campo nome deve ser uma string";

  if (!agente.dataDeIncorporacao) {
    errors.dataDeIncorporacao = "Campo dataDeIncorporacao é obrigatório";
  } else if (typeof agente.dataDeIncorporacao !== 'string' || !dataRegex.test(agente.dataDeIncorporacao)) {
    errors.dataDeIncorporacao = "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD'";
  } else {
    // Validação para não aceitar datas futuras
    const dataIncorp = new Date(agente.dataDeIncorporacao);
    const hoje = new Date();
    hoje.setHours(0,0,0,0); // Ignora horário, só compara data
    if (dataIncorp > hoje) {
      errors.dataDeIncorporacao = "Data de incorporação não pode ser no futuro";
    }
  }

  if (!agente.cargo) errors.cargo = "Campo cargo é obrigatório";
  else if (typeof agente.cargo !== 'string' || !cargosPermitidos.includes(agente.cargo.toLowerCase())) {
    errors.cargo = `Campo cargo deve ser um dos seguintes: ${cargosPermitidos.join(', ')}`;
  }

  if (Object.keys(errors).length > 0) {
    const err = {
      name: 'ValidationError',
      status: 400,
      message: "Parâmetros inválidos",
      errors
    };
    throw err;
  }
}

module.exports = validarAgenteCompleto;