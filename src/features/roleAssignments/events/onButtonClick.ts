import { ButtonInteraction, GuildMemberRoleManager } from 'discord.js'
import KomiEvent from '../../../classes/KomiEvent'
import { getKomiRoleById } from '../../../database/controllers/role'
import DiscordEvent from '../../../enums/DiscordEvents'

export default new KomiEvent(
  DiscordEvent.InteractionCreate,
  false,
  async (interaction: ButtonInteraction) => {
    if (!interaction.isButton()) return

    const komiRole = getKomiRoleById(interaction.customId)
    const guildRole = interaction.guild?.roles.cache.find(
      (role) => role.toString() === komiRole?.role,
    )
    const memberRoles = interaction.member?.roles as GuildMemberRoleManager

    if (!memberRoles.cache.find(
      (role) => role.toString() === komiRole?.role,
    )) {
      await memberRoles.add(guildRole!)
      interaction.reply({
        content: 'New role added.',
        ephemeral: true,
      })
      return
    }

    await memberRoles.remove(guildRole!)
    interaction.reply({
      content: 'Role removed.',
      ephemeral: true,
    })
  },
)
