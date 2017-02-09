var Sockets = require('../Sockets');

function Routes(server, app, game) {
  Sockets.listen(server, game);
}

module.exports = Routes;
