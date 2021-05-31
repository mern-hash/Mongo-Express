const http = require('http');
const app= require('./app')

const server = http.createServer(app);

server.listen(7800, console.log('app is running'));




