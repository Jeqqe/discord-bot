import { Interaction } from 'discord.js'
import { getCommandFromState } from '../../../state/CommandState'
import { DiscordEvent } from '../../../types/enums'
import { DiscordEventListener } from '../../../types/interfaces'

const event: DiscordEventListener = {
  interaction: DiscordEvent.interactionCreate,
  once: false,
  execute: async (interaction: Interaction) => {
    if (!interaction.isCommand()) return

    try {
      await getCommandFromState(interaction.commandName)?.execute(interaction)
    } catch (error) {
      console.log(error)
    }
  },
}

export default event
