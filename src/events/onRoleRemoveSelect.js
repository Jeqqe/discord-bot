const { removeRole } = require('../../controllers/roles')
const { isAdmin } = require('../../utils/permissions')

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
      await removeRole(interaction.client, interaction.guild, interaction.values[0])
      await interaction.editReply({ content: `Role removed.`, components: [] })
    }
  },
}
