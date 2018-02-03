const express = require('express');
const server = express();
const options = {
  index: 'index.html'
};
server.use('/', express.static('/home/site/wwwroot', options));
server.listen(process.env.PORT);
