function errorHandlers(err, req, res, next) {
  console.log("🚀🚀🚀", { name: err.name, message: err.message });

  let statusCode;
  let errorMessage;

  switch (err.name) {
    case "ValidationError":
      statusCode = 400;
      errorMessage = err.message || "Validation error";
      break;
    case "NotFoundError":
      statusCode = 404;
      errorMessage = err.message || "Not found";
      break;
    case "ForbiddenError":
      statusCode = 403;
      errorMessage = err.message || "Forbidden";
      break;
    case "SequelizeValidationError":
      statusCode = 400;
      errorMessage = err.message || "Validation error";
      break;
    case "Unauthenticated":
      statusCode = 401;
      errorMessage = err.message || "Unauthenticated";
      break;
    default:
      statusCode = 500;
      errorMessage = err.message || "Internal server error";
      break;
  }
  res.status(statusCode).json({ error: errorMessage });
}

module.exports = errorHandlers;
