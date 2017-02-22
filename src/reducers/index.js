import {combineReducers} from 'redux';
import players from './playerReducer';
import phase from './phaseReducer';
import settings from './settingsReducer';
import me from './meReducer';

const rootReducer = combineReducers({
  players,
  phase,
  settings,
  me
});

export default rootReducer;
