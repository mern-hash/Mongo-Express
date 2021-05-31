const http = require('http');
const app= require('./app')

const server = http.createServer(app);

server.listen(1500, console.log('app is running'));




