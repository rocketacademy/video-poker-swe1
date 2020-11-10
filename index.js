import { createServer } from 'http';
import { readFile } from 'fs';
import { extname } from 'path';

// set a variable that contains info on what port the server should listen on
const PORT = process.argv[3];

// create the function that will respond to a request
const whenIncomingRequest = (request, response) => {
  console.log('incoming request...');
  console.log(`request URL: ${request.url}`); // (e.g. index.html, textFile.txt, etc.)

  // use logic to direct the client to the main file (ie stuff.txt) even if he doesn't specify it
  let filePath = `/home/ubuntu/swe1/VP-Jeremy/${request.url}`;
  if (request.url === '/') { // ('/' is the default request.url if no path is specified)
    filePath += '/stuff.html'; // (here, we are setting /stuff.html as the default path)
  }

  // examine the extention of the files being requested, to see if it matches a MIME type.

  const extensionName = String(extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
  };

  const contentType = mimeTypes[extensionName]; // || 'application/octet-stream';
  console.log(`contenttype is: ${contentType}`);

  // read into the file specified at the file path
  readFile(filePath, (error, content) => {
    // set the function to return an error if the file is not successfully sent back
    if (error) {
      console.log('there\'s an error!');
      console.log(`error code is : ${error}`);
      if ((error.code === 'ENOENT')) {
        if (request.url === '/banana') {
          response.writeHead(999, { 'content-type': 'text/html' });
          response.end('hello banana!', 'utf-8');
        } else {
          const filePathFor404 = '/home/ubuntu/swe1/VP-Jeremy/404.html';
          readFile(filePathFor404, (err, data) => {
            if (err) { console.log(`Error: ${err.code}`); }
            response.writeHead(404, { 'Content-type': 'text/html' });
            response.end(data, 'utf-8');
          });
        }
      }
    } else {
      console.log('there is no error');
      // set the function to notify user of sucessful response:
      // the console log wld be  '200 if a file is successfully sent back
      if (extensionName in mimeTypes) {
        response.writeHead(200, { 'content-type': contentType });
        response.end(content, 'utf-8');
      } else if (contentType === undefined) {
        console.log('file exists but user is not allowed to access it');
        response.writeHead(500, { 'content-type': 'undefined' });
        response.end('no access granted', 'utf-8');
      }
    }
  });
};

// create the server
createServer(whenIncomingRequest).listen(PORT);
