import {
  MessageActionRow,
  MessageAttachment,
  MessageButton,
  MessageEmbed,
  TextChannel,
} from 'discord.js'
import KomiClient from '../../../classes/KomiClient'
import KomiChannels, { getKomiChannel } from '../../../enums/KomiChannels'
import RoleMessages from '../../../locale/RoleMessages'

const assignmentBanner = new MessageAttachment('./src/images/roleAssignmentBanner.png')

export const roleAssignmentEmbed = new MessageEmbed()
  .setColor('#8bd8d8')
  .setTitle(RoleMessages.roleAssignmentEmbedTitle)
  .setDescription('** **')
  .setImage('attachment://roleAssignmentBanner.png')

export const getRoleAssignmentMessage = () => {
  const roleAssignmentChannel = getKomiChannel(KomiChannels.RoleAssignments) as TextChannel
  const komiRoles = KomiClient.getInstance().assignmentRoles

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
    embeds: [roleAssignmentEmbed],
    files: [assignmentBanner],
    components,
  }
}

export const updateRoleAssignmentEmbed = async () => {
  const assignmentChannel = getKomiChannel(KomiChannels.RoleAssignments) as TextChannel
  if (!assignmentChannel) return

  const messages = await assignmentChannel.messages.fetch({ limit: 50 })
  const foundMessages = messages.filter((message) => {
    if (message.embeds.find(
      (embed) => embed.title === RoleMessages.roleAssignmentEmbedTitle,
    )) return true
    return false
  })

  if (foundMessages.size === 1) {
    foundMessages.first()!.edit(getRoleAssignmentMessage())
    return
  }

  await assignmentChannel.bulkDelete(foundMessages)
  await assignmentChannel.send(getRoleAssignmentMessage())
}
