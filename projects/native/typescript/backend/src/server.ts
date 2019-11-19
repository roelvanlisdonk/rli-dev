import * as express from 'express';
import * as path from 'path';
import { registerFallbackRoute } from './services/file.service';
import { registerServerSideEventsRoute } from './services/server-side-events.service';
import { watchFrontendCodeChanges } from './services/watch.service';

const port = 3003;
const app: express.Application = express();

// Determine frontend root and src folders.
const frontendRootFolder = path.join(__dirname, '../../frontend');
console.log(`Frontend root folder: ${frontendRootFolder}.`);
const frontendSrcFolder = path.join(frontendRootFolder, 'src');
console.log(`Frontend src folder: ${frontendSrcFolder}.`);

// Setup an endpoint, so the client can receive server side events.
registerServerSideEventsRoute(app);

// Register fallback route, that will serve the spa.
registerFallbackRoute(app, frontendSrcFolder);

// Setup watcher for frontend code changes.
watchFrontendCodeChanges(frontendRootFolder, frontendSrcFolder);

// Start listening to requests.
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

export { app };
