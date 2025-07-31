function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  if (process.env.NODE_ENV !== 'production') {
    console.error('Erro:', err);
  }

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
}

module.exports = errorHandler;
