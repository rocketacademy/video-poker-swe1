// const fs = require('fs');

const { readFile } = require('fs');
const http = require('http');
const path = require('path');

const PORT = process.argv[2];
const file = './index.html';
const game = './game.html';

http
  .createServer((req, res) => {
    const fileName = req.url;
    const extentionName = String(path.extname(fileName)).toLocaleLowerCase();
    console.log('THIS IS REQ -> ', fileName);

    readFile(`./${fileName}`, (err, content) => {
      if (!err) {
        res.end(content);
        return;
      }
      console.log(err);
    });
  })
  .listen(PORT, console.log(`Server listening on port ${PORT}`));
