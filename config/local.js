const Interfaces = require('os').networkInterfaces()['无线网络连接'];
exports.IP = (function(argument) {
  let ip;
  Interfaces.forEach(net => {
    if (net.family === 'IPv4') {
      ip = net.address;
      console.log(ip)
    }
  })
  return ip;
})()
