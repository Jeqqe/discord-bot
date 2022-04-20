const { addRole } = require('../../../controllers/roles')
const { linkToEmote } = require('../../../utils/links')
const { updateAssignmentEmbed } = require('../../embeds/roleAssignment')

const validateNewEmote = async (guild, client, name, emoteOrUrl) => {
  let emote = client.emojis.cache.find(
    (emoji) => emoteOrUrl.includes(emoji.name && emoji.id)
  )

  if (emote) return emote

  emote = await linkToEmote(guild, emoteOrUrl, name)
  if (!emote) return false
  return emote
}

const runSubCommandAdd = async (interaction) => {
  const {
    guild, channel, client, options
  } = interaction

  const name = options.get('name').value
  const displayname = options.get('displayname').value
  const emoteOrUrl = await validateNewEmote(guild, client, name, options.get('emote').value)

  if (!emoteOrUrl) {
    return { error: 'Given image url or emote is not a valid emote.' }
  }

  let foundRole = guild.roles.cache.find((role) => role.name.toUpperCase() === name.toUpperCase())
  if (!foundRole) foundRole = await guild.roles.create({ name })

  const newRole = await addRole(foundRole.id, name, displayname, emoteOrUrl)

  if (newRole.error) {
    return { error: newRole.error }
  }

  client.roles.push(newRole)
  updateAssignmentEmbed(channel, client.roles)
  return newRole
}

module.exports = { runSubCommandAdd }
