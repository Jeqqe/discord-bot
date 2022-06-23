import {
  MessageAttachment,
  MessageEmbed,
} from 'discord.js'
import KomiRoleTypes from '../../../enums/KomiRoleTypes'
import RoleMessages from '../../../locale/RoleMessages'
import { getAssignmentMessage, updateAssignmentEmbed } from './baseAssignmentEmbed'

export const embedIdString = `Role - ${KomiRoleTypes.Games}`

const banner = new MessageAttachment('./src/images/gamesAssignmentBanner.png')

const embed = new MessageEmbed()
  .setColor('#8bd8d8')
  .setTitle(RoleMessages.gamesAssignmentEmbedTitle)
  .setDescription('** **')
  .setImage('attachment://gamesAssignmentBanner.png')
  .setFooter({ text: embedIdString })

export const gamesMessageEmbed = () => getAssignmentMessage(
  KomiRoleTypes.Games,
  [embed],
  [banner],
)
export const gamesUpdateEmbed = () => updateAssignmentEmbed(
  KomiRoleTypes.Games,
  gamesMessageEmbed(),
)
