export function notFound(req, res, next) {
  const error = new Error(`Page not found: ${req.originalUrl}`);

  error.statusCode = 404;

  next(error);
}