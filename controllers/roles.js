const Role = require('../schemas/roles')
const { linkToEmote } = require('../utils/links')

const getAllRoles = async () => {
  const roles = await Role.find({})
  return roles
}

const addRole = async (client, guild, name, displayname, emote) => {
  let roleEmote = await linkToEmote(guild, emote, name)
  if (!roleEmote) {
    roleEmote = client.emojis.cache.find(
      (emoji) => emote.includes(emoji.name && emoji.id)
    )
  }
  if (!roleEmote) return { error: 'I do not know the said emote. :(' }

  let foundRole = guild.roles.cache.find((role) => role.name.toUpperCase() === name.toUpperCase())
  if (!foundRole) foundRole = await guild.roles.create({ name })

  const newRole = new Role({
    id: foundRole.id, name, displayname, emote: roleEmote
  })
  newRole.save()

  client.roles.push(newRole)
  return newRole
}

const removeRole = async (client, guild, id) => {
  guild.roles.delete(id, 'Bai Bai').catch((err) => {
    console.log(err)
  })

  client.roles = client.roles.filter((role) => role.id !== id)
  const removedRole = await Role.deleteOne({ id })
  return removedRole
}

module.exports = { getAllRoles, addRole, removeRole }
