import { CommandInteraction } from 'discord.js'
import sendAssignmentEmbed from '../embeds/roleAssignments'

export default async (interaction: CommandInteraction) => {
  sendAssignmentEmbed(interaction)
}
