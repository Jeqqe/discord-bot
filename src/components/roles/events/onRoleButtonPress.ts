import { ButtonInteraction, Message } from 'discord.js'
// import { Channel } from '../../../config'
import { getRoleFromStateByID } from '../../../state/RolesState'
import { DiscordEvent } from '../../../types/enums'
import { DiscordEventListener } from '../../../types/interfaces'

const event: DiscordEventListener = {
  interaction: DiscordEvent.interactionCreate,
  once: false,
  execute: async (interaction: ButtonInteraction) => {
    if (!interaction.isButton()) return

    const message = interaction.message as Message

    if (!message.guild) return

    // if (message.channel.id !== Channel.ROLE_ASSIGNMENT) return
    if (message.author.id === interaction.user.id) return

    const assignmentRole = getRoleFromStateByID(interaction.customId)
    if (!assignmentRole) return

    const matchedRole = message.guild.roles.cache.find(
      (guildRole) => guildRole.id === assignmentRole.id,
    )
    const matchedMember = message.guild.members.cache.find(
      (member) => member.user.id === interaction.user.id,
    )

    if (!matchedMember || !matchedRole) return
    if (matchedMember.roles.cache.some((role) => role.id === assignmentRole.id)) {
      matchedMember.roles.remove(matchedRole)
    } else {
      matchedMember.roles.add(matchedRole)
    }

    interaction.deferUpdate()
  },
}

export default event
