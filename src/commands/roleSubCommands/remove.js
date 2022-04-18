const { MessageActionRow, MessageSelectMenu } = require('discord.js')

const runSubCommandRemove = (interaction) => {
  interaction.reply({
    content: 'Which role would you like to remove?',
    components: [
      new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('roleselect')
            .setPlaceholder('Nothing selected')
            .addOptions(
              interaction.client.roles.map(({
                name, displayname, id, emote
              }) => ({
                label: name,
                description: displayname,
                value: id,
                emoji: emote
              }))
            )
        )
    ]
  })
}

module.exports = { runSubCommandRemove }
