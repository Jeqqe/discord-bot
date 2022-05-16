import {
  CommandInteraction,
} from 'discord.js'
import { addRole } from '../../../database/controllers/roles'
import { addRoleToState, getRoleFromStateByName } from '../../../state/RolesState'
import { addTimedInteractionReply } from '../../../utils/messages'
import { validateEmoteUrlFromString } from '../../../utils/validate'

export default async (interaction: CommandInteraction) => {
  const {
    guild, channel, client, options,
  } = interaction
  if (!guild || !channel || !client || !options) return

  const name = options.getString('name')
  const displayname = options.getString('displayname')
  const emote = options.getString('emote')

  if (!name || !displayname || !emote) return

  let foundRole = guild.roles.cache.find(
    (role) => role.name.toUpperCase() === name.toUpperCase(),
  )

  let foundEmote = client.emojis.cache.find(
    (emoji) => emote.includes(emoji.name! && emoji.id),
  )

  if (!foundEmote) {
    if (!validateEmoteUrlFromString(emote)) return
    foundEmote = await guild.emojis.create(emote, name)
  }
  if (!foundRole) foundRole = await guild.roles.create({ name })

  if (!getRoleFromStateByName(name)) {
    const newRole = await addRole(foundRole.id, name, displayname, foundEmote.toString())
    if (!newRole) return
    addRoleToState(newRole)
  }

  await addTimedInteractionReply(interaction, 'Role added', 3)
}
