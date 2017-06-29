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
    res.send();
  });

  app.post('/api/game/choosePlayersForMission', function(req, res) {
    game.setPlayersForMission(req.body.ids);
    game.continue();
    res.send();
  });

  app.post('/api/game/vote', function(req, res) {
    console.log("Voting route");
    console.log(req.body);
    game.vote(req.body.id, req.body.approve);
    res.send();
  });

  app.post('/api/game/mission', function(req, res) {
    game.mission(req.body.id, req.body.succeed);
    res.send();
  })

  app.post('/api/profile/image', function(req, res) {
    game.setPlayerImage(req.body.id, req.body.file[0]);
    res.send();
  })
}

module.exports = Routes;
