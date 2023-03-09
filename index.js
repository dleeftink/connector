const express = require('express');
const app = express();
const port = 3011;
const path = require('path');

const { createTunnel, closeTunnel, redactUrl } = require('proxy-chain');

app.get('/', async (req, res) => {
  const PROXY_URL = 'http://user:1234@161.35.70.249:8080';
  const TARGET_HOST = 'en.wikipedia.org:443';

  // Create tunnel for the service, this call will start local tunnel and
  // return a string in format localhost:<selected-port>.
  // Here we set "port" to 9999, but you can use 0 to get a random port.
  // The "verbose" option causes a lot of logging
  const tunnelInfo = await createTunnel(PROXY_URL, TARGET_HOST, {
    port: 23,
    verbose: true,
  });

  res.send({ answer: true, tunnelInfo });
  
      // Wait forever...
      await new Promise(() => {});

      // Normally, you'd also want to close the tunnel and all open connections
      await closeTunnel(tunnelInfo, true);


});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

/*const express = require('express');
const cors = require('cors');
const Unblocker = require('unblocker');
const path = require('path');
const axios = require('axios');
const { HttpProxyAgent, HttpsProxyAgent } = require('hpagent');

const app = express();

const port = 3010;

function XFrameSameOrigin(data) {
  data.headers['x-frame-options'] = 'allow';
}

var unblocker = new Unblocker({
    prefix: '/p',
      responseMiddleware: [
    XFrameSameOrigin,
  ]
});

app.use(unblocker);

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  })
);

app.get('/', async (req, res) => {
  const proxyAgent = new HttpsProxyAgent({
    keepAlive: true,
    keepAliveMsecs: 1000,
    maxSockets: 256,
    maxFreeSockets: 256,
  });
  const response = await axios('https://httpbin.org/ip?json', {
   // httpsAgent: proxyAgent,
  });

  const body = (await response)?.data;

  res.send(JSON.stringify({ hello: 'world', body }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
*/
