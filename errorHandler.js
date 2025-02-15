class ErrorResponse extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
  
    // Log error for debugging
    console.error(err);
  
    // Handle specific error cases
    if (err.name === "CastError") {
      const message = `Resource not found with ID: ${err.value}`;
      error = new ErrorResponse(message, 404);
    }
  
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new ErrorResponse(message, 400);
    }
  
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
      error = new ErrorResponse(message, 400);
    }
  
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  };
  
  module.exports = {
    ErrorResponse,
    errorHandler,
  };
  