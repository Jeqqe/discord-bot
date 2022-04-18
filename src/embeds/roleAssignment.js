const { MessageEmbed } = require('discord.js')

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

const sendAssignmentEmbed = async (channel, roles) => {
  channel.send({
    embeds: [embed(roles)],
    fetchReply: true
  }).then((message) => {
    roles.forEach(async (role) => {
      await message.react(role.emote)
    })
  })
}

const updateAssignmentEmbed = async (channel, roles) => {
  channel.messages.fetch({ limit: 5 }).then((messages) => {
    messages.forEach((message) => {
      if (message.embeds[0]) {
        if (message.embeds[0].title === 'Role Assignments') message.delete()
      }
    })
  })

  await sendAssignmentEmbed(channel, roles)
}

module.exports = { embed, updateAssignmentEmbed, sendAssignmentEmbed }
