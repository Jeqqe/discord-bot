const { MessageEmbed } = require('discord.js')

const embed = (title, description) => new MessageEmbed()
  .setColor('#0099ff')
  .setTitle(title)
  .setDescription(description)

const sendBotUpdateEmbed = (channel, title, description) => {
  channel.send({
    embeds: [embed(title, description)]
  })
}

module.exports = { embed, sendBotUpdateEmbed }
