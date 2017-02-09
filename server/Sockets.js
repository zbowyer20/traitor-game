var Player = require('./components/player/Player');

var Sockets = {
  list: {},

  listen: function(server, game) {
    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function(socket) {
      console.log("Got new connection from: " + socket.id);
      Sockets.list[socket.id] = socket;
      game.players.add(socket.id);
      Sockets.emit(game.getPublicPack());
      Sockets.emit({
        ids: [socket.id],
        data: {
          me: {
            id: socket.id
          }
        }
      });

      // when receiving a flag from a player that they are ready, flag them
      // in game
      socket.on('ready', function() {
        game.players.ready(socket.id);
      });

      socket.on('disconnect', function() {
        delete Sockets.list[socket.id];
        game.players.remove(socket.id);
        game.end(Sockets.list);
      });
    });
  },

  /**
  * Emit a game update.
  * @param pack {Object} containing socket IDs to emit to and data to emit
  */
  emit: function(pack) {
    for (var i = 0; i < pack.ids.length; i++) {
      Sockets.list[pack.ids[i]].emit('update', pack.data);
    }
  }
}

module.exports = Sockets;
