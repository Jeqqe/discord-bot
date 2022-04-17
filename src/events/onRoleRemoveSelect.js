const { removeRole } = require('../../controllers/roles')
const { isAdmin } = require('../../utils/permissions')
const { updateAssignmentEmbed } = require('../embeds/roleAssignmentEmbed')

module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction) {
    if (!interaction.isSelectMenu()) return

    if (interaction.customId === 'roleselect') {
      await interaction.deferUpdate()
      if (!isAdmin(interaction.member)) {
        await interaction.editReply({ content: 'You\'re not allowed to execute this command.', components: [] })
        return
      }

      const { client, guild, values } = interaction
      const removedRole = await removeRole(client, guild, values[0])
      updateAssignmentEmbed('remove', client.roles, removedRole, interaction)
    }
  },
}
