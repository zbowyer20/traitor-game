import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
import * as routeActions from '../../actions/routeActions';
import Phase from '../status/Phase';
import Players from '../player/Players';
import Me from '../me/Me';
import Actions from '../actions/Actions';

class GamePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let players = {
      all: this.props.players,
      opponents: [],
      me: {
        id: this.props.me.id,
        object: null
      }
    }

    if (players.all.length && players.me.id) {
      players.opponents = players.all.filter(player => { return player.id != players.me.id});
      players.me.object = players.all.filter(player => { return player.id == players.me.id})[0];
    }

    return (
      <div>
        <Phase phase={this.props.phase.id}/>
        {players.opponents.length > 0 && <Players players={players.opponents} settings={this.props.settings} me={players.me.object} phase={this.props.phase} actions={this.props.actions}/>}
        {players.me.object && <Me player={players.me.object} />}
        {players.me.object && <Actions player={players.me.object} game={this.props} actions={this.props.actions}/>}
      </div>
    );
  }
}

GamePage.propTypes = {
  players: PropTypes.array.isRequired,
  phase: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

// ownProps is a reference to the component's own properties
function mapStateToProps(state) {
  // lets us access courses using props.courses
  return {
      players: state.players,
      phase: state.phase,
      me: state.me,
      settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse is a function taking one parameter, course
    actions: bindActionCreators(Object.assign({}, gameActions, routeActions), dispatch)
  };
}

// connect allows components to communicate with redux
// that makes this a container component
const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(GamePage);
