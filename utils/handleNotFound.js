const handleNotFound = (req, res) => {
  if (!res.headersSent) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
}


module.exports = handleNotFound