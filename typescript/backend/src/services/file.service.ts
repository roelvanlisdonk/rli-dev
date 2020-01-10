import * as express from 'express';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

/**
 * This route should be registered last, because it is the fallback route.
 * It will serve files, like the index.html, *.map files, JavaScript modules etc.
 * @param frontendSrcFolder
 */
export function registerFallbackRoute(app: express.Application, frontendSrcFolder: string) {
  // Fallback route '*', should be registered as last route.
  app.get('*', (req: express.Request, res: express.Response) => {
    console.log(`Get url: ${req.url}.`);
    const file = getFileName(req.url, frontendSrcFolder);

    console.log(`Return file: ${file}.`);
    res.sendFile(file, { root: frontendSrcFolder });
  });
}

function getFileName(requestUrl: string, frontendRootFolder: string): string {
  const spaEntry = 'index.html';
  const urlParts: url.UrlWithStringQuery = url.parse(requestUrl);
  let pathName = urlParts.pathname as string;
  if (!pathName || pathName === '/') {
    return spaEntry;
  }

  // Fix for *.map files, loading ts files
  if (pathName.startsWith('/frontend/')) {
    pathName = `..${pathName}`;
  }
  const fullFilePath = path.join(frontendRootFolder, pathName);
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
