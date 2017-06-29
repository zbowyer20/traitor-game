'use strict';

var Player = require('./components/player/Player');
var SocketEmissions = require('./constants/SocketEmissions');

var Sockets = {
  list: {},

  listen: function(server, game) {
    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function(socket) {
      console.log("Got new connection from: " + socket.id);
      Sockets.list[socket.id] = socket;
      game.addPlayer(socket.id);
      Sockets.emitGame(game, {
        public: {
          settings: [SocketEmissions.READY],
          players: [SocketEmissions.ID, SocketEmissions.IMAGE, SocketEmissions.HOST],
          phase: [SocketEmissions.PHASE_UPDATE]
        },
        private: {
          players: [SocketEmissions.ID, SocketEmissions.IMAGE, SocketEmissions.HOST, SocketEmissions.IS_TRAITOR]
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
  emit: function(id, data) {
    Sockets.list[id].emit('update', data);
  },

  emitToList: function(pack) {
    for (var i = 0; i < pack.ids.length; i++) {
      Sockets.emit(pack.ids[i], pack.data);
    }
  },

  emitPublic: function(game, options, id) {
    Sockets.emit(id, game.getPublicPack(id, options));
  },

  emitPrivate: function(game, options, id) {
    console.log("Emitting a private pack to: " + id);
    console.log(options);
    console.log(game.getPrivatePack(id, options));
    Sockets.emit(id, game.getPrivatePack(id, options));
  },

  emitGame: function(game, options) {
    let ids = game.players.ids();
    for (var i = 0; i < ids.length; i++) {
      if (options.public) {
        Sockets.emitPublic(game, options.public, ids[i])
      }
      if (options.private) {
        Sockets.emitPrivate(game, options.private, ids[i]);
      }
    }
  },

  emitToAll: function(data) {
    for (var i = 0; i < Object.keys(Sockets.list).length; i++) {
      let id = Object.keys(Sockets.list)[i];
      Sockets.emit(id, data);
    }
  }
}

module.exports = Sockets;
