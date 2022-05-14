import { GuildMember, Interaction } from 'discord.js'
import { removeRolebyID } from '../../../database/controllers/roles'
import { removeRoleFromState } from '../../../state/RolesState'
import { DiscordEvent } from '../../../types/enums'
import { DiscordEventListener } from '../../../types/interfaces'
import { addEditedReply } from '../../../utils/messages'
import { isAdmin } from '../../../utils/permissions'

const event: DiscordEventListener = {
  interaction: DiscordEvent.interactionCreate,
  once: false,
  execute: async (interaction: Interaction) => {
    if (!interaction.isSelectMenu()) return
    if (interaction.customId !== 'roleselect') return

    if (!isAdmin(interaction.member as GuildMember)) {
      await addEditedReply(interaction, { content: 'You\'re not allowed to execute this command.', components: [] }, 3)
      return
    }

    const {
      guild, values,
    } = interaction

    if (!guild || !values) return

    const removedRole = await removeRolebyID(values[0])
    if (!removedRole) return

    removeRoleFromState(removedRole)

    await guild.roles.delete(values[0])

    const emote = guild.emojis.cache.find(
      (emoji) => removedRole.emote.includes(emoji.id),
    )
    if (emote) await emote.delete()

    await interaction.deferUpdate()
    await interaction.editReply({ content: 'Role removed.', components: [] })
  },
}

export default event
