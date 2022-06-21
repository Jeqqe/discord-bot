import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import {
  CommandInteraction,
  GuildMember,
  Role,
} from 'discord.js'

import KomiSubCommand from '../../../../classes/KomiSubCommand'
import { getKomiRoleByGuildRole, removeKomiRole } from '../../../../database/controllers/role'
import GeneralMessages from '../../../../locale/GeneralMessages'
import RoleMessages from '../../../../locale/RoleMessages'
import isAdmin from '../../../../utils/isAdmin'
import { updateRoleAssignmentEmbed } from '../../messages/roleAssignmentEmbed'

export enum Options {
  ROLE = 'role',
}

export default new KomiSubCommand(
  new SlashCommandSubcommandBuilder()
    .setName('remove')
    .setDescription('Removes a guild assignment role')
    .addRoleOption((option) => option
      .setName(Options.ROLE)
      .setDescription('The role you want to remove')
      .setRequired(true)),
  async (interaction: CommandInteraction) => {
    if (!isAdmin(interaction.member as GuildMember)) {
      interaction.reply({
        content: GeneralMessages.commandInvalidPermissions,
        ephemeral: true,
      })
      return
    }

    const guildRole = interaction.options.getRole(Options.ROLE)!
    const komiRole = getKomiRoleByGuildRole(guildRole.toString())

    if (!komiRole) {
      interaction.reply({
        content: RoleMessages.roleDoesNotExistError,
        ephemeral: true,
      })
      return
    }

    const komiEmoji = interaction.guild?.emojis.cache.find(
      (emoji) => emoji.toString() === komiRole.emoji,
    )

    if (komiEmoji) {
      const deletedEmoji = await komiEmoji.delete()
        .catch(() => {
          interaction.reply({
            content: RoleMessages.roleRemoveError,
            ephemeral: true,
          })
        }) || null

      if (!deletedEmoji) return
    }

    await interaction.guild?.roles.delete(guildRole as Role)
      .catch(() => {
        interaction.reply({
          content: RoleMessages.roleRemoveError,
          ephemeral: true,
        })
      })

    await removeKomiRole(komiRole)
    await updateRoleAssignmentEmbed()

    interaction.reply({
      content: RoleMessages.roleRemoved,
      ephemeral: true,
    })
  },
)
