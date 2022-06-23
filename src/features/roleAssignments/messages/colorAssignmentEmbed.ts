import {
  MessageAttachment,
  MessageEmbed,
} from 'discord.js'
import KomiRoleTypes from '../../../enums/KomiRoleTypes'
import RoleMessages from '../../../locale/RoleMessages'
import { getAssignmentMessage, updateAssignmentEmbed } from './baseAssignmentEmbed'

export const embedIdString = `Role - ${KomiRoleTypes.Colors}`

const banner = new MessageAttachment('./src/images/colorAssignmentBanner.png')

const embed = new MessageEmbed()
  .setColor('#8bd899')
  .setTitle(RoleMessages.colorAssignmentEmbedTitle)
  .setDescription('** **')
  .setImage('attachment://colorAssignmentBanner.png')
  .setFooter({ text: embedIdString })

export const colorMessageEmbed = () => getAssignmentMessage(
  KomiRoleTypes.Colors,
  [embed],
  [banner],
)
export const colorUpdateEmbed = () => updateAssignmentEmbed(
  KomiRoleTypes.Colors,
  colorMessageEmbed(),
)
