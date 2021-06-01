const http = require('http');
const app= require('./app')

const server = http.createServer(app);

server.listen(8700, console.log('app is running'));




