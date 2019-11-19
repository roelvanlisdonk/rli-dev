export function setupServerSideEvents() {
  if (!!window.EventSource) {
    const source = new EventSource('/connect');

    source.addEventListener(
      'message',
      function(e) {
        if (e.data === 'frontend-sources-changed') {
          // Refresh the browser, because frontend code changed on the server.
          location.reload(true);
        }
      },
      false
    );

    source.addEventListener(
      'open',
      function() {
        console.log(`Browser connected to backend.`);
      },
      false
    );

    source.addEventListener(
      'error',
      function(e) {
        console.log(`EventPhase: ${e.eventPhase}`);
        if (e.eventPhase == EventSource.CLOSED) {
          console.log('Server send closed event, close the connection');
          source.close();

          // Retry connection in 2 seconds.
          setTimeout(setupServerSideEvents, 2000);
          return;
        }
      },
      false
    );
  } else {
    console.log("Your browser doesn't support SSE");
  }
}
