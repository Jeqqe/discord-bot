import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction, GuildMember } from 'discord.js'
import KomiClient from '../../../../classes/KomiClient'

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
    .setDescription(RoleMessages.addCommandDescription)
    .addStringOption((option) => option
      .setName(Options.RoleLabel)
      .setDescription(RoleMessages.labelOptionDescription)
      .setRequired(true))
    .addStringOption((option) => option
      .setName(Options.RoleType)
      .setDescription(RoleMessages.typeOptionDescription)
      .setRequired(true)
      .addChoices(
        { name: 'Games', value: KomiRoleTypes.Games },
        { name: 'Colors', value: KomiRoleTypes.Colors },
      ))
    .addStringOption((option) => option
      .setName(Options.EmojiUrl)
      .setDescription(RoleMessages.imageUrlOptionDescription)
      .setRequired(true))
    .addStringOption((option) => option
      .setName(Options.RoleColor)
      .setDescription(RoleMessages.colorCodeOptionDescription)),

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

    const roleExists = KomiClient.getInstance().assignmentRoles.some(
      (komiRole) => komiRole.id === roleId,
    )

    if (roleExists) {
      interaction.reply({
        content: RoleMessages.roleAlreadyExistsError,
        ephemeral: true,
      })
      return
    }

    const guildEmoji = await interaction.guild?.emojis.create(emojiUrl!, roleId)
      .catch(() => {
        interaction.reply({
          content: RoleMessages.roleImageUrlError,
          ephemeral: true,
        })
      }) || null

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
      }) || null

    if (!guildEmoji || !guildRole) {
      await guildEmoji?.delete()
      await guildRole?.delete()

      return
    }

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
