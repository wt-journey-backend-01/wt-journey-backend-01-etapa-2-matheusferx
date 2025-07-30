const express = require('express');
const app = express();

const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
