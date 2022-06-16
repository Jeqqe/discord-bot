import { CommandInteraction } from 'discord.js'
import KomiCommand from '../../../classes/KomiCommand'

export default new KomiCommand(
  'komi',
  'Komi test command',
  {
    commandExecute: async (interaction: CommandInteraction) => {
      await interaction.reply('...')
    },
  },
)
