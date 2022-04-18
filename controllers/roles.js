const Role = require('../schemas/roles')

const getAllRoles = async () => {
  const roles = await Role.find({})
  return roles
}

const addRole = async (id, name, displayname, emote) => {
  const newRole = new Role({
    id, name, displayname, emote
  })
  newRole.save()
  return newRole
}

const removeRolebyID = async (id) => {
  const removedRole = await Role.findOneAndDelete({ id })
  return removedRole
}

module.exports = { getAllRoles, addRole, removeRolebyID }
