function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: err.message || 'Erro interno do servidor',
      status,
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    console.error('Erro:', err); // Log detalhado apenas em dev
  }
}

module.exports = errorHandler;
