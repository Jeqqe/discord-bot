import { CommandInteraction, Message, MessageEmbed } from 'discord.js'

import { getRolesState } from '../../../state/RolesState'
import { Role } from '../../../types/interfaces'

const embed = (roles: Array<Role>) => new MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Role Assignments')
  .setDescription('Select roles you would like to receive notifications from')
  .addFields(
    roles.map(({ displayname, emote }) => ({
      name: `${emote} ${displayname}`,
      value: '** **',
      inline: true,
    })),
  )

const sendAssignmentEmbed = async (message: CommandInteraction) => {
  const roles = getRolesState()

  const repliedMessage = await message.reply({
    embeds: [embed(roles)],
    fetchReply: true,
  })

  roles.forEach(async (role: Role) => {
    (repliedMessage as Message).react(role.emote)
  })
}

export default sendAssignmentEmbed
