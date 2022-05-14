import Roles from '../schemas/roles'

export const getAllRoles = async () => {
  const roles = await Roles.find({})
  return roles
}

export const addRole = async (id: string, name: string, displayname: string, emote: string) => {
  const newRole = new Roles({
    id, name, displayname, emote,
  })
  newRole.save()
  return newRole
}

export const removeRolebyID = async (id: string) => {
  const removedRole = await Roles.findOneAndDelete({ id })
  return removedRole
}
