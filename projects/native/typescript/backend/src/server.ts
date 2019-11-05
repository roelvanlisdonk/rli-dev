import * as express from 'express';
import * as path from 'path';

const port = 3003;

// Init express
const app: express.Application = express();

const frontendDir = path.join(__dirname, '../../dist/frontend/src');

app.get('*', (request: express.Request, response: express.Response) => {
  const url = request.url;
  console.log(`get url: ${url}.`);
  const regEx = /\.(?!\/).*$/;
  if (regEx.test(url)) {
    // TODO return file.
  } else {
    response.sendFile('index.html', { root: frontendDir });
  }
});

// Start listening to requests.
app.listen(port, () => {
  console.log(`Local mock backend listening on port ${port}!!!`);
});
