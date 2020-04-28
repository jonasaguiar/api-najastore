const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

console.log(app.port);


function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port' + addr.port;
    debug('Listening on ' + bind);
}