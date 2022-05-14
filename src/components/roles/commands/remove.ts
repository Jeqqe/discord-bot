import { CommandInteraction, MessageActionRow, MessageSelectMenu } from 'discord.js'
import { getRolesState } from '../../../state/RolesState'

export default async (interaction: CommandInteraction) => {
  await interaction.reply({
    content: 'Which role would you like to remove?',
    ephemeral: true,
    components: [
      new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('roleselect')
            .setPlaceholder('Nothing selected')
            .addOptions(
              getRolesState().map(({
                name, displayname, id, emote,
              }) => ({
                label: name,
                description: displayname,
                value: id,
                emoji: emote,
              })),
            ),
        ),
    ],
  })
}
