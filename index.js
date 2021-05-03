import { readFile } from 'fs';
import { createServer } from 'http';

const PORT = process.argv[2];

createServer((req, res) => {
  res.send('Hello');
}).listen(PORT, console.log(`Server listening on port ${PORT}`));
