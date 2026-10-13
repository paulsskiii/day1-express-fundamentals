function errorHandler(err, req, res, next) {
  console.error(err.stack);
  let statusCode = err.statusCode || 500;
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = 400;
  }
  const hideDetails = statusCode >= 500 && process.env.NODE_ENV === 'production';
  const message = hideDetails ? 'Internal server error' : err.message || 'Internal server error';
  res.status(statusCode).json({ success: false, error: { message } });
}

module.exports = errorHandler;
