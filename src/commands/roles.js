const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const RoleAssignmentEmbed = require('../embeds/RoleAssignmentEmbed')

const { CHANNELS: { ROLE_ASSIGNMENT } } = require('../../config.json')

const { isAdmin } = require('../../utils/permissions')
const { addTimedReply } = require('../../utils/messages')
const { addRole } = require('../../controllers/roles')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Role assignment related commands.')
    .addSubcommand((subCmd) => subCmd
      .setName('summon')
      .setDescription('Summon role assignment embed'))
    .addSubcommand((subCmd) => subCmd
      .setName('remove')
      .setDescription('Remove role'))
    .addSubcommand((subCmd) => subCmd
      .setName('add')
      .setDescription('Add new role')
      .addStringOption((option) => option.setName('name')
        .setDescription('The name of the new role')
        .setRequired(true))
      .addStringOption((option) => option.setName('displayname')
        .setDescription('Displayname for the new role')
        .setRequired(true))
      .addStringOption((option) => option.setName('emote')
        .setDescription('The emote for the new role')
        .setRequired(true))),
  execute(interaction) {
    if (!interaction.isCommand()) return
    if (!isAdmin(interaction.member)) {
      addTimedReply(interaction, 'You\'re not allowed to execute this command.', 5)
      return
    }

    switch (interaction.options.getSubcommand()) {
      case 'summon':
        if (interaction.channel.id !== ROLE_ASSIGNMENT) {
          addTimedReply(interaction, 'You can\'t use that command in this channel.', 5)
          break
        }
        interaction.reply({
          embeds: [RoleAssignmentEmbed(interaction.client.roles)],
          fetchReply: true
        }).then((message) => {
          interaction.client.roles.forEach((role) => {
            message.react(role.emote)
          })
        })
        break
      case 'add':
        addRole(
          interaction.client,
          interaction.guild,
          interaction.options.get('name').value,
          interaction.options.get('displayname').value,
          interaction.options.get('emote').value
        ).then((role) => {
          if (role.error) {
            addTimedReply(interaction, role.error, 5)
            return
          }
          addTimedReply(interaction, `Added new role: ${role.emote} ${role.displayname}`, 5)
        })
        break
      case 'remove':
        interaction.reply({
          content: 'Which role would you like to remove?',
          components: [
            new MessageActionRow()
              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('roleselect')
                  .setPlaceholder('Nothing selected')
                  .addOptions(
                    interaction.client.roles.map((role) => ({
                      label: role.name,
                      description: role.displayname,
                      value: role.id,
                      emoji: role.emote
                    }))
                  ),
              )
          ]
        })
        break
      default:
        addTimedReply(interaction, 'No valid subcommand found.', 5)
    }
  },
}
