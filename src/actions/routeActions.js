export function startGame() {
  return dispatch => {
    let url = 'http://localhost:3535/api/game/start';
    fetch(url).then(response => {
      console.log(response);
    }).catch(error => {
      throw(error);
    });
  };
}

export function choosePlayersForMission(ids) {
  return dispatch => {
    let url = 'http://localhost:3535/api/game/choosePlayersForMission';
    console.log("Posting ids: " + ids);
    fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ids: ids
        })
      }
    ).then(response => {
      console.log(response);
    }).catch(error => {
      throw(error);
    });
  }
}

export function vote(id, approve) {
  return dispatch => {
    let url = 'http://localhost:3535/api/game/vote';
    fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application.json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id,
          approve: approve
        })
      }
    ).then(response => {
      console.log(response);
    }).catch(error => {
      throw(error);
    });
  }
}

export function mission(id, succeed) {
  return dispatch => {
    let url = 'http://localhost:3535/api/game/mission';
    fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application.json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id,
          succeed: succeed
        })
      }
    ).then(response => {
      console.log(response);
    }).catch(error => {
      throw(error);
    });
  }
}
