// redis setup
const redis = require("redis");
const client = redis.createClient({
  host: "192.168.4.3"
});
const Redis = require('ioredis');
const pub = new Redis({
  host: "192.168.4.3"
});
const channel = 'userConnected';

// express socket.io setup
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// get app address setup
const os = require('os');
const ifaces = os.networkInterfaces();
let address = '';
const port = 8080;

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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    console.log("addr", addr);
    client.set('india', address + ':' + port, (data) => {
        console.log('Indian server has sent a presence', data);
    });
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
}

server.listen(port, onListening);

app.get('/', function (req, res) {
  res.status(200).send("This is indian server")
});

io.on('connection', function (socket) {
    if (socket.handshake.query && socket.handshake.query.token){
        console.log("User connected on Indian server");
        pub.publish(channel, JSON.stringify({server: 'india', user: socket.handshake.query.token}));
    }
});