import * as express from 'express';

const connections: express.Response[] = [];

export function registerServerSideEventsRoute(app: express.Application) {
  app.get('/connect', function(_, res: express.Response) {
    console.log('Connect request received from client.');

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    });

    // First send a newline as described on https://jasonbutz.info/2018/08/server-sent-events-with-node
    res.write('\n');

    // Send a informational message to the browser.
    res.write(
      'data: Connected to server, this connection will be used to send a refresh request to the client, when frontend sources change.\n\n'
    );

    // Save the connection, so we can notify clients in the future.
    connections.push(res);

    console.log('Connected to client.');
  });
}

export function sendRefreshEvent() {
  for (const connection of connections) {
    console.log(`Connection status: ${connection.status}`);
    console.log(`Connection statusCode: ${connection.statusCode}`);
    console.log(`Connection statusCode: ${connection.statusMessage}`);
    connection.write('data: frontend-sources-changed\n\n');
  }
}
