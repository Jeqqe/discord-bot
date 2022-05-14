import { CommandInteraction } from 'discord.js'
import { addTimedInteractionReply } from '../../../utils/messages'

export default async (interaction: CommandInteraction) => {
  await addTimedInteractionReply(interaction, '...', 3)
}
