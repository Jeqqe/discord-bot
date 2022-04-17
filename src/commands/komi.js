const { SlashCommandBuilder } = require('@discordjs/builders')
const { addTimedReply } = require('../../utils/messages')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('komi')
    .setDescription('A test command for komi bot.'),
  execute(interaction) {
    addTimedReply(interaction, '...', 5)
  },
}
