import { DiscordEvent } from '../../../types/enums'
import { DiscordEventListener } from '../../../types/interfaces'

const event: DiscordEventListener = {
  interaction: DiscordEvent.ready,
  once: false,
  execute: async () => {
    console.log('Application started and ready.')
  },
}

export default event
