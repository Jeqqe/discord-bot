import KomiEvent from '../../../classes/KomiEvent'
import DiscordEvent from '../../../enums/DiscordEvents'
import { colorUpdateEmbed } from '../messages/colorAssignmentEmbed'
import { gamesUpdateEmbed } from '../messages/gamesAssignmentEmbed'

export default new KomiEvent(
  DiscordEvent.Ready,
  false,
  async () => {
    await colorUpdateEmbed()
    await gamesUpdateEmbed()
  },
)
