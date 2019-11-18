import * as express from 'express';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

console.log('starting server!!');

const port = 3003;

// Init express
const app: express.Application = express();

const frontendDir = path.join(__dirname, '../../frontend/src');
// if (!__dirname.endsWith('/dist/backend/src')) {
//   frontendDir = path.join(__dirname, '../../dist/frontend/src');
// }
console.log(`frontendDir: ${frontendDir}.`);

app.get('/countdown', function(_, res: express.Response) {
  console.log('countdown called');
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  // This post describes we have to first send a newline before we can send requests:
  // https://jasonbutz.info/2018/08/server-sent-events-with-node/
  res.write('\n');
  countdown(res, 10);
});

app.get('*', (req: express.Request, res: express.Response) => {
  console.log(`get url: ${req.url}.`);

  const file = getFileName(req.url);
  console.log(`return file: ${file}.`);

  res.sendFile(file, { root: frontendDir });
});

function countdown(res: express.Response, count: number) {
  res.write('data: ' + count + '\n\n');
  if (count) {
    setTimeout(() => countdown(res, count - 1), 10000);
  } else {
    // After 10 message we wait
    res.end();
  }
}

// Start listening to requests.
app.listen(port, () => {
  console.log(`Local mock backend listening on port ${port}!!!!!`);
});

function getFileName(requestUrl: string): string {
  const spaEntry = 'index.html';
  const urlParts: url.UrlWithStringQuery = url.parse(requestUrl);
  let pathName = urlParts.pathname as string;
  if (!pathName || pathName === '/') {
    return spaEntry;
  }

  // Fix for map files, loading ts files
  if (pathName.startsWith('/frontend/')) {
    pathName = `..${pathName}`;
  }
  const fullFilePath = path.join(frontendDir, pathName);
  if (fs.existsSync(fullFilePath)) {
    // Return file path, because the file exists.
    return pathName;
  }

  if (fs.existsSync(`${fullFilePath}.js`)) {
    // A JavaScript module was requested, return the path to the JavaScript file.
    return `${pathName}.js`;
  }

  // We are using a spa, so return the spa entry for all unmatched paths.
  return spaEntry;
}

export { app };
