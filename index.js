const express = require('express');
const app = express();
const port = 3000;

const needle = require('needle');

app.get('/', async (req, res) => {
  
let resp = (await needle('get','https://pub.reflow.workers.dev/')).body;
console.log(resp);

 res.send({answer:true,resp})

})

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
