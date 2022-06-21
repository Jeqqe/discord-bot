import KomiEvent from '../../../classes/KomiEvent'
import DiscordEvent from '../../../enums/DiscordEvents'
import { updateRoleAssignmentEmbed } from '../messages/roleAssignmentEmbed'

export default new KomiEvent(
  DiscordEvent.ready,
  false,
  async () => {
    await updateRoleAssignmentEmbed()
  },
)
