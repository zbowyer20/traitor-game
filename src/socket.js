import * as actions from './actions/gameActions';
import io from 'socket.io-client';

export default function (store) {
  const socket = io('http://localhost:3535');

  socket.on('update', function(data) {
    if (data.phase) {
      store.dispatch(actions.updatePhase(data.phase));
    }
    if (data.players) {
      console.log(data);
      store.dispatch(actions.updatePlayers(data.players))
    }
    if (data.settings) {
      store.dispatch(actions.updateSettings(data.settings))
    }
    if (data.me) {
      store.dispatch(actions.updateMe(data.me));
    }
  })

  socket.on('endGame', function() {
    store.dispatch(actions.endGame());
  });

  return socket;
}
