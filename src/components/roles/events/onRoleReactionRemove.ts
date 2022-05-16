import { MessageReaction, User } from 'discord.js'
import { Channel } from '../../../config'
import { getRoleFromStateByEmote } from '../../../state/RolesState'
import { DiscordEvent } from '../../../types/enums'
import { DiscordEventListener } from '../../../types/interfaces'

const event: DiscordEventListener = {
  interaction: DiscordEvent.messageReactionRemove,
  once: false,
  execute: async (reaction: MessageReaction, user: User) => {
    if (reaction.partial) {
      try {
        await reaction.fetch()
      } catch (error) {
        console.error('Something went wrong when fetching the message:', error)
        return
      }
    }

    if (
      !reaction || !reaction.message || !reaction.message.author || !reaction.message.guild
    ) return

    if (reaction.message.channel.id !== Channel.ROLE_ASSIGNMENT) return
    if (reaction.message.author.id === user.id) return

    const assignmentRole = getRoleFromStateByEmote(reaction.emoji.toString())
    if (!assignmentRole) return

    const matchedRole = reaction.message.guild.roles.cache.find(
      (guildRole) => guildRole.id === assignmentRole.id,
    )
    const matchedMember = reaction.message.guild.members.cache.find(
      (member) => member.user.id === user.id,
    )

    if (!matchedMember || !matchedRole) return
    matchedMember.roles.remove(matchedRole)
  },
}

export default event
