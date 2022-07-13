import {
  MessageEmbed,
  MessageAttachment,
  TextChannel,
  MessageActionRow,
  MessageButton,
  MessageOptions,
} from 'discord.js'
import KomiClient from '../../../classes/KomiClient'
import KomiChannels, { getKomiChannel } from '../../../enums/KomiChannels'
import KomiRoleTypes from '../../../enums/KomiRoleTypes'

export const getAssignmentMessage = (
  type: KomiRoleTypes,
  embeds: MessageEmbed[],
  files: MessageAttachment[],
) => {
  const roleAssignmentChannel = getKomiChannel(
    KomiChannels.RoleAssignments,
  ) as TextChannel
  const komiRoles = KomiClient.getInstance().assignmentRoles.filter(
    (komiRole) => komiRole.type === type,
  )

  let buttonRow = new MessageActionRow()
  let counter = 1
  const components = []

  komiRoles.forEach((role) => {
    if (counter > 5) {
      components.push(buttonRow)
      buttonRow = new MessageActionRow()
      counter = 1
    }

    const guildEmoji = roleAssignmentChannel.guild.emojis.cache.find(
      (emoji) => emoji.toString() === role.emoji,
    )!

    buttonRow.addComponents(
      new MessageButton()
        .setCustomId(role.id)
        .setLabel(role.label)
        .setStyle('SECONDARY')
        .setEmoji(guildEmoji),
    )

    counter += 1
  })
  if (buttonRow.components.length > 0) components.push(buttonRow)

  return {
    embeds,
    files,
    components,
  } as MessageOptions
}

export const updateAssignmentEmbed = async (
  type: KomiRoleTypes,
  embed: MessageOptions,
) => {
  const assignmentChannel = getKomiChannel(
    KomiChannels.RoleAssignments,
  ) as TextChannel
  if (!assignmentChannel) return

  const messages = await assignmentChannel.messages.fetch({ limit: 50 })
  const foundMessages = messages.filter((message) => {
    if (message.embeds.find(
      (messageEmbed) => messageEmbed.footer?.text.includes(type),
    )) return true
    return false
  })

  if (foundMessages.size === 1) {
    await foundMessages.first()!.edit(embed)
    return
  }

  await assignmentChannel.bulkDelete(foundMessages)
  await assignmentChannel.send(embed)
}
