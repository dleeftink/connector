const express = require('express');
const app = express();
const port = 3010;
const path = require('path');

const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');

app.use(express.static('static'));

app.get('/', async (req, res) => {
  const proxyAgent = new HttpsProxyAgent('http://46.250.171.31:8080');
  const response = await axios('https://api.ipify.org/?format=json', {
   // agent: proxyAgent,
  });
  const body = await response.text();

  res.send(JSON.stringify({ hello: 'world', body }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
