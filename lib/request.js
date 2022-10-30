export async function getSession(id) {
    const resp = await fetch(`/api/game/${id}`,  {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    })
    return (await resp.json())[0]
}

export const postRequest = async (team, name) => {
    return await fetch(`/api/game`, {
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
      })
    }).then(res => res.json())
  }

 export const putRequest = async (id, team, name) => {
    return await fetch(`/api/game/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
        team: team,
        dev: name,
      })
    }).then(res => res.json())
  }

  export const updatePoints = async (id, name, point) => {
    return await fetch(`/api/point/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
        name: name,
        point: point
      })
    }).then(res => res.json())
  }