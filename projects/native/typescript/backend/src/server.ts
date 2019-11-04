import * as express from 'express';
import * as path from 'path';

const port = 3003;

// Init express
const app: express.Application = express();

const frontendDir = path.join(__dirname, '../../dist/frontend/src');

app.get('*', (_, res: express.Response) => {
  console.log('send index.html');
  res.sendFile('index.html', { root: frontendDir });
});

// Start listening to requests.
app.listen(port, () => {
  console.log(`Local mock backend listening on port ${port}!!!`);
});
