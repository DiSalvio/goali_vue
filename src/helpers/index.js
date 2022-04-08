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
