import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import KomiSubCommand from '../../../../classes/KomiSubCommand'

export default new KomiSubCommand(
  new SlashCommandSubcommandBuilder()
    .setName('setup')
    .setDescription('Setups the role assignments to the current channel'),
  async (interaction: CommandInteraction) => {
    await interaction.reply('setup')
  },
)
