import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../../actions/gameActions';
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
      all: this.props.game.players,
      opponents: [],
      me: {
        id: this.props.game.me.id,
        object: null
      }
    }

    if (players.all.length && players.me.id) {
      players.opponents = players.all.filter(player => { return player.id != players.me.id});
      players.me.object = players.all.filter(player => { return player.id == players.me.id})[0];
    }

    return (
      <div>
        <Phase phase={this.props.game.phase.id}/>
        {players.opponents.length > 0 && <Players players={players.opponents}/>}
        {players.me.object && <Me player={players.me.object} />}
        {players.me.object && <Actions player={players.me.object} game={this.props.game} actions={this.props.actions}/>}
      </div>
    );
  }
}

GamePage.propTypes = {
  game: PropTypes.object.isRequired
};

// ownProps is a reference to the component's own properties
function mapStateToProps(state) {
  // lets us access courses using props.courses
  return {
      game: state.game
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse is a function taking one parameter, course
    actions: bindActionCreators(Object.assign({}, gameActions), dispatch)
  };
}

// connect allows components to communicate with redux
// that makes this a container component
const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(GamePage);
