import * as fs from 'fs';
import * as path from 'path';
import { sendRefreshEvent } from './server-side-events.service';

export function watchFrontendCodeChanges(frontendRootFolder: string, frontendSrcFolder: string) {
  // When tsc -w is done transpiling, it updates the tsconfig.tsbuildinfo, so we know the frontend code is transpiled and we can refresh the client.
  fs.watch(path.join(frontendRootFolder, 'tsconfig.tsbuildinfo'), (_: string, filename: string) => {
    refresh(filename);
  });

  // When html files change we should refresh the client.
  fs.watch(path.join(frontendSrcFolder), (_: string, filename: string) => {
    if (filename.endsWith('.html')) {
      refresh(filename);
    }
  });
}

function refresh(filename: string) {
  if (filename) {
    console.log(`${filename} file Changed.`);
    sendRefreshEvent();
  }
}
