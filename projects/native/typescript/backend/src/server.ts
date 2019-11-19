import * as express from 'express';
import * as path from 'path';
import { registerFallbackRoute } from './services/file.service';
import { registerServerSideEventsRoute } from './services/server-side-events.service';

const port = 3003;

// Register route for server side event, that is used to reload the browser, when frontend code changes.
const app: express.Application = express();

// Determine frontend root folder.
const frontendRootFolder = path.join(__dirname, '../../frontend/src');
console.log(`Frontend application - Root folder: ${frontendRootFolder}.`);

// Setup an endpoint, so the client can receive server side events.
registerServerSideEventsRoute(app);

// Register fallback route, that will serve the spa.
registerFallbackRoute(app, frontendRootFolder);

// Start listening to requests.
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

export { app };
