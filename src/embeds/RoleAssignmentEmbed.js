const { MessageEmbed } = require('discord.js')

module.exports = (roles) => new MessageEmbed()
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
