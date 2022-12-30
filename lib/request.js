export async function getSession(id) {
    return fetch(`/api/game/${id}`,  {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(response => response.json())
      .then(result => result[0])
}

export async function postRequest(team, name){
    return fetch(`/api/game`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        team: team,
        devs:
        [
          {
            name: name,
            isAdmin: true
          }  
        ],
        show:false,
      })
    }).then(response => response.json())
      .then(result => result)
  }

 export const putRequest = async (id, team, name) => {
    return fetch(`/api/game/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
        team: team,
        dev: name,
      })
    }).then(response => response.json())
      .then(result => result[0])
  }

  export const updatePoints = async (id, name, point) => {
    return fetch(`/api/point/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
        name: name,
        point: point
      })
    }).then(response => response.json())
      .then(result => result[0])
  }

  export const clearPoints = async (id) => {
    return fetch(`/api/action/${id}?action=reset`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id: id
      })
    }).then(response => response.json())
    .then(result => result)
  }


  export const showPoints = async (id) => {
    return fetch(`/api/action/${id}?action=show`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
    .then(result => result)
  }