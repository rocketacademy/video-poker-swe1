const readFile = require('fs'.readFile);

const createServer = require('http'.createServer);

const PORT = process.argv[2];

createServer((req, res) => {
  res.send('Hello');
}).listen(PORT, console.log(`Server listening on port ${PORT}`));
