import * as express from 'express';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

const port = 3003;

// Init express
const app: express.Application = express();

const frontendDir = path.join(__dirname, '../../frontend/src');
// if (!__dirname.endsWith('/dist/backend/src')) {
//   frontendDir = path.join(__dirname, '../../dist/frontend/src');
// }
console.log(`frontendDir: ${frontendDir}.`);

app.get('*', (req: express.Request, res: express.Response) => {
  console.log(`get url: ${req.url}.`);

  const file = getFileName(req.url);
  console.log(`return file: ${file}.`);

  res.sendFile(file, { root: frontendDir });
});

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
