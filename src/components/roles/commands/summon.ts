import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js'
import { getRolesState } from '../../../state/RolesState'
// import sendAssignmentEmbed from '../embeds/roleAssignments'

export default async (interaction: CommandInteraction) => {
  // sendAssignmentEmbed(interaction)

  const {
    guild, channel, client, options,
  } = interaction
  if (!guild || !channel || !client || !options) return

  const rows: MessageActionRow[] = []
  let row = new MessageActionRow()
  getRolesState().forEach((role, index) => {
    row.addComponents(
      new MessageButton()
        .setCustomId(role.id)
        .setEmoji(role.emote)
        .setLabel(role.displayname)
        .setStyle('PRIMARY'),
    )

    if ((index + 1) % 5 === 0) {
      rows.push(row)
      row = new MessageActionRow()
    } else if ((index + 1) === getRolesState.length) {
      rows.push(row)
    }
  })

  channel.send({ components: rows })
}
