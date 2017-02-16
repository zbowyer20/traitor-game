var Sockets = require('../Sockets');

function Routes(server, app, game) {
  Sockets.listen(server, game);

  /**
  * Draw a card
  * @param pid {String} The id of the player drawing a card
  * @returns {Object} containing the card drawn and the player's id
  * @emits data to update the opponent the player's hand has updated
  */
  app.get('/api/game/start', function(req, res) {
    game.continue();
  });
}

module.exports = Routes;
