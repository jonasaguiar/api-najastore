const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

const port = process.env.Port || 2000 ;


console.log(app.port);
//app.set(port);

const server = http.createServer(app);

server.listen(port);
server.on('listening', onListening);

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port' + addr.port;
    debug('Listening on ' + bind);
}