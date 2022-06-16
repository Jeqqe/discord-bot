import { CommandInteraction } from 'discord.js'

import KomiClient from '../../../classes/KomiClient'
import KomiEvent from '../../../classes/KomiEvent'
import DiscordEvent from '../../../enums/DiscordEvents'

export default new KomiEvent(
  DiscordEvent.interactionCreate,
  false,
  async (interaction: CommandInteraction) => {
    const command = KomiClient.getInstance().commands.get(interaction.commandName)
    if (!command) return

    await command.execute(interaction).catch((error) => {
      console.log(error)
      interaction.reply({
        content: 'There was an error executing this command...',
        ephemeral: true,
      })
    })
  },
)
