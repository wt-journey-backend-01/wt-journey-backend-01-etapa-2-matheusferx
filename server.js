const express = require('express')
const casosRoutes = require('./routes/casosRoutes');
const agentesRoutes = require('./routes/agentesRoutes');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(casosRoutes);
app.use(agentesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});