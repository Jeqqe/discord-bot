const { MessageEmbed } = require('discord.js')

const embed = (title, description) => new MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Developer updates')
  .setDescription('Update logs are posted automatically everytime new production build is taken into use.')
  .addFields([{
    name: title,
    value: description,
    inline: true
  }])

const sendBotUpdateEmbed = (channel, title, description) => {
  channel.send({
    embeds: [embed(title, description)]
  })
}

module.exports = { embed, sendBotUpdateEmbed }
