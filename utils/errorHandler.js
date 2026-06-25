const errorHandler = (res, code, message) => {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: message }));
}

module.exports = errorHandler;