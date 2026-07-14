import environment from "../config/environment.js";

export function errorHandler(error, req, res, next) {
  // If Express already started sending the response, let Express finish
  // handling the error instead of trying to send a second response.
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = Number.isInteger(error.statusCode)
    ? error.statusCode
    : 500;

  const isServerError = statusCode >= 500;

  // Server errors should be recorded so that the developer can investigate.
  if (isServerError) {
    console.error(error);
  }

  // Do not reveal internal error details to visitors in production.
  const message =
    environment.isProduction && isServerError
      ? "Something went wrong."
      : error.message;

  if (statusCode === 404) {
    return res.status(404).render("errors/404", {
      title: "Page Not Found",
      statusCode,
      message
    });
  }

  return res.status(statusCode).render("errors/500", {
    title: "Server Error",
    statusCode,
    message
  });
}