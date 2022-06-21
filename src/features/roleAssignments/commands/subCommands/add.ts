import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction, GuildMember } from 'discord.js'

import KomiSubCommand from '../../../../classes/KomiSubCommand'
import { createKomiRole } from '../../../../database/controllers/role'
import GeneralMessages from '../../../../locale/GeneralMessages'
import RoleMessages from '../../../../locale/RoleMessages'
import isAdmin from '../../../../utils/isAdmin'

export enum Options {
  ROLE_LABEL = 'role_label',
  EMOJI_URL = 'emoji_url',
}

export default new KomiSubCommand(
  new SlashCommandSubcommandBuilder()
    .setName('add')
    .setDescription('Creates a new guild assignment role')
    .addStringOption((option) => option
      .setName(Options.ROLE_LABEL)
      .setDescription('Label that is displayed in the role assignment button')
      .setRequired(true))
    .addStringOption((option) => option
      .setName(Options.EMOJI_URL)
      .setDescription('Image url used to create a new emoji for the role')
      .setRequired(true)),

  async (interaction: CommandInteraction) => {
    if (!isAdmin(interaction.member as GuildMember)) {
      interaction.reply({
        content: GeneralMessages.commandInvalidPermissions,
        ephemeral: true,
      })
      return
    }

    const roleLabel = interaction.options.getString(Options.ROLE_LABEL)!
    const roleId = `Komi${roleLabel.replace(' ', '')}`
    const emojiUrl = interaction.options.getString(Options.EMOJI_URL)!

    const guildEmoji = await interaction.guild?.emojis.create(emojiUrl!, roleId)
      .catch(() => {
        interaction.reply({
          content: RoleMessages.roleImageUrlError,
          ephemeral: true,
        })
      }) || null

    if (!guildEmoji) return

    const guildRole = await interaction.guild?.roles.create({
      name: roleLabel,
      reason: RoleMessages.roleCreationReason,
    })
      .catch(() => {
        interaction.reply({
          content: RoleMessages.roleCreationError,
          ephemeral: true,
        })
        guildEmoji.delete()
      }) || null

    if (!guildRole) return

    createKomiRole(roleId, roleLabel, guildEmoji.toString(), guildRole.toString())

    interaction.reply({
      content: RoleMessages.roleCreated,
      ephemeral: true,
    })
  },
)
