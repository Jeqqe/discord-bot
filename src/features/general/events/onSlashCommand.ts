import { CommandInteraction } from 'discord.js'

import KomiClient from '../../../classes/KomiClient'
import KomiEvent from '../../../classes/KomiEvent'
import DiscordEvent from '../../../enums/DiscordEvents'
import GeneralMessages from '../../../locale/GeneralMessages'

export default new KomiEvent(
  DiscordEvent.InteractionCreate,
  false,
  async (interaction: CommandInteraction) => {
    const command = KomiClient.getInstance().getCommands().get(interaction.commandName)
    if (!command) return

    await command.execute(interaction).catch(() => {
      interaction.reply({
        content: GeneralMessages.commandExecutionError,
        ephemeral: true,
      })
    })
  },
)
