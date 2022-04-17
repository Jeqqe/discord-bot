const { MessageEmbed } = require('discord.js')
const { addTimedReply } = require('../../utils/messages')

const embed = (roles) => new MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Role Assignments')
  .setDescription('Select roles you would like to receive notifications from')
  .addFields(
    roles.map(({ displayname, emote }) => ({
      name: `${emote} ${displayname}`,
      value: '** **',
      inline: true
    }))
  )

const updateAssignmentEmbed = async (action, roles, role, replyable) => {
  let actionString
  switch (action) {
    case 'add':
      actionString = 'Added new'
      break
    case 'remove':
      actionString = 'Removed'
      break
    default: return
  }
  const reply = await addTimedReply(replyable, `${actionString} role: ${role.emote} ${role.displayname}`, 5)

  reply.channel.messages.fetch({ limit: 5 }).then((messages) => {
    const lastMessage = messages.last()
    lastMessage.delete()
  })

  reply.channel.send({
    embeds: [embed(roles)],
    fetchReply: true
  }).then((message) => {
    roles.forEach(async (guildRole) => {
      await message.react(guildRole.emote)
    })
  })
}

const sendAssignmentEmbed = async (roles, replyable) => {
  const reply = await addTimedReply(replyable, 'Fetching embed...', 2)
  reply.channel.send({
    embeds: [embed(roles)],
    fetchReply: true
  }).then((message) => {
    roles.forEach(async (role) => {
      await message.react(role.emote)
    })
  })
}

module.exports = { embed, updateAssignmentEmbed, sendAssignmentEmbed }
