When running npm install, I was getting the error:

npm ERR! code E401
npm ERR! Unable to authenticate, need: Basic realm="https://pkgsprodsu3weu.app.pkgs.visualstudio.com/"

This was fixed by updating my credentials inside my 'user' .npmrc file.
In my case located at: C:\Users\roelv
