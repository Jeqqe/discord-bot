const { removeRolebyID } = require('../../controllers/roles')
const { isAdmin } = require('../../utils/permissions')
const { updateAssignmentEmbed } = require('../embeds/roleAssignment')
const { CHANNELS: { ROLE_ASSIGNMENT } } = require('../../config.json')

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

      const {
        guild, client, values, channel
      } = interaction

      if (channel.id !== ROLE_ASSIGNMENT) return

      const removedRole = await removeRolebyID(values[0])
      if (!removedRole) return

      client.roles = client.roles.filter((role) => role.id !== removedRole.id)
      guild.roles.delete(values[0]).catch((err) => {
        console.log(err)
      })

      const emote = guild.emojis.cache.find(
        (emoji) => removedRole.emote.includes(emoji.id)
      )
      if (emote) emote.delete()

      updateAssignmentEmbed(channel, client.roles)
      await interaction.deleteReply()
    }
  },
}
