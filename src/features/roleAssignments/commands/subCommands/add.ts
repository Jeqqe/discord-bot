import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction, GuildMember } from 'discord.js'

import KomiSubCommand from '../../../../classes/KomiSubCommand'
import { createKomiRole } from '../../../../database/controllers/role'
import KomiRoleTypes from '../../../../enums/KomiRoleTypes'
import GeneralMessages from '../../../../locale/GeneralMessages'
import RoleMessages from '../../../../locale/RoleMessages'
import isAdmin from '../../../../utils/isAdmin'
import { colorUpdateEmbed } from '../../messages/colorAssignmentEmbed'
import { gamesUpdateEmbed } from '../../messages/gamesAssignmentEmbed'

enum Options {
  RoleLabel = 'role_label',
  RoleType = 'role_type',
  EmojiUrl = 'emoji_url',
  RoleColor = 'color',
}

export default new KomiSubCommand(
  new SlashCommandSubcommandBuilder()
    .setName('add')
    .setDescription('Creates a new guild assignment role')
    .addStringOption((option) => option
      .setName(Options.RoleLabel)
      .setDescription('Label that is displayed in the role assignment button')
      .setRequired(true))
    .addStringOption((option) => option
      .setName(Options.RoleType)
      .setDescription('Label that is displayed in the role assignment button')
      .setRequired(true)
      .addChoices(
        { name: 'Games', value: KomiRoleTypes.Games },
        { name: 'Colors', value: KomiRoleTypes.Colors },
      ))
    .addStringOption((option) => option
      .setName(Options.EmojiUrl)
      .setDescription('Image url used to create a new emoji for the role')
      .setRequired(true))
    .addStringOption((option) => option
      .setName(Options.RoleColor)
      .setDescription('Colorcode without the #. Used when creating a new color type role')),

  async (interaction: CommandInteraction) => {
    if (!isAdmin(interaction.member as GuildMember)) {
      interaction.reply({
        content: GeneralMessages.commandInvalidPermissions,
        ephemeral: true,
      })
      return
    }

    const roleLabel = interaction.options.getString(Options.RoleLabel)!
    const roleId = `Komi${roleLabel.replace(' ', '')}`
    const emojiUrl = interaction.options.getString(Options.EmojiUrl)!
    const roleType = interaction.options.getString(Options.RoleType)! as KomiRoleTypes
    const roleColor = interaction.options.getString(Options.RoleColor)!

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
      color: roleType === KomiRoleTypes.Colors ? `#${roleColor}` : undefined,
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

    await createKomiRole(roleId, roleType, roleLabel, guildEmoji.toString(), guildRole.toString())

    switch (roleType) {
      case KomiRoleTypes.Games:
        await gamesUpdateEmbed()
        break
      case KomiRoleTypes.Colors:
        await colorUpdateEmbed()
        break
      default:
        return
    }

    interaction.reply({
      content: RoleMessages.roleCreated,
      ephemeral: true,
    })
  },
)
