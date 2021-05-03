// const fs = require('fs');

const http = require('http');

const PORT = process.argv[2];

http
  .createServer((req, res) => {
    res.send('Hello');
  })
  .listen(PORT, console.log(`Server listening on port ${PORT}`));
