export const findById = (resource, id) => resource.find(r => r.id === parseInt(id))

export const filterChildrenById = (resource, parent, parentId) => {
  return resource.filter(r => r[parent] === parseInt(parentId))
}

export const activeOnly = (resource) => resource.filter(r => r.removed === false)

export const completedOnly = (resource) => resource.filter(r => r.completed === true)

export const inProgressOnly = (resource) => resource.filter(r => r.completed === false)

export const updateItemInArray = ({ resource }) => {
  return (state, { item }) => {
    state[resource][
      state[resource].findIndex(r => r.id === item.id)
    ] = item
  }
}

// use resource if there is no associated id
// ex: /login/, /goals/, /goals/1/tasks/
// using ids will automatically prepend resource type
// ex: 1 => goals/1/, [ 1, 4, 5] => goals/1/tasks/4/subtasks/5/
export const urlHelper = ({ resource='', ids=[] }) => {
  let url = process.env.VUE_APP_API_URL
  const resources = [ '/goals/', '/tasks/', '/subtasks/' ]
  url = url + ids.map((id, index) => resources[index] + id).join('')
  if (resource) {
    return url + '/' + resource + '/'
  } else {
    return url + '/'
  }
}

export const authHeader = (token) => {
  return {
    headers: {
      'Authorization': 'Token ' + token
    }
  }
}
