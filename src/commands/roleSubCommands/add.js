const { addRole } = require('../../../controllers/roles')
const { linkToEmote } = require('../../../utils/links')
const { addTimedReply } = require('../../../utils/messages')
const { updateAssignmentEmbed } = require('../../embeds/roleAssignment')

// TODO: Verify that link is valid image
const validateNewEmote = (guild, client, name, emoteOrUrl) => {
  let emote = linkToEmote(guild, emoteOrUrl, name)
  if (!emote) {
    emote = client.emojis.cache.find(
      (emoji) => emoteOrUrl.includes(emoji.name && emoji.id)
    )
  }
  if (!emote) return null
  return emote
}

const runSubCommandAdd = async (interaction) => {
  const {
    guild, channel, client, options
  } = interaction

  const name = options.get('name').value
  const displayname = options.get('displayname').value
  const emoteOrUrl = await validateNewEmote(guild, client, name, options.get('emote').value)

  if (!emoteOrUrl) return { error: 'I do not know the said emote. :(' }

  let foundRole = guild.roles.cache.find((role) => role.name.toUpperCase() === name.toUpperCase())
  if (!foundRole) foundRole = await guild.roles.create({ name })

  const newRole = await addRole(foundRole.id, name, displayname, emoteOrUrl)

  if (newRole.error) {
    addTimedReply(interaction, newRole.error, 5)
    return false
  }

  client.roles.push(newRole)
  updateAssignmentEmbed(channel, client.roles)
  return newRole
}

module.exports = { runSubCommandAdd }
