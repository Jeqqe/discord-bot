const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('komi')
    .setDescription('A test command for komi bot.'),
  async execute(interaction) {
    await interaction.reply('...')
  },
}
