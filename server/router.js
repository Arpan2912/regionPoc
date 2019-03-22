const redis = require("redis");
const client = redis.createClient({
  host: "192.168.4.3"
});
const Redis = require('ioredis');
const redisio = new Redis({
  host: "192.168.4.3"
});
const channel = 'userConnected';

// get app address setup
const os = require('os');
const ifaces = os.networkInterfaces();
let address = '';
const port = 9090;

Object.keys(ifaces).forEach(function (ifname) {
    let alias = 0;
  
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
  
      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
        if (ifname === 'enp2s0')
          address = iface.address
      }
      ++alias;
    });
});

redisio.subscribe(channel, (error, count) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Subscribed to ${count} channel. Listening for updates on the ${channel} channel.`);
});


// express socket.io setup
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    console.log("addr", addr);
    client.set('admin', address + ':' + port, (data) => {
        console.log('Admin server has sent a presence', data);
    });
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
}

server.listen(port, onListening);

app.get('/', function (req, res) {
  res.status(200).send("This is admin server")
});

io.on('connection', function (socket) {
    if (socket.handshake.query && socket.handshake.query.token){
        console.log("User connected on server user", socket.handshake.query.token);

        redisio.on('message', (channel, data) => {
            data = JSON.parse(data)
            console.log(`New user has connected on ${channel}: ${data.user} on ${data.server}`);
            socket.emit('new_connection', data);
        });
    }
});