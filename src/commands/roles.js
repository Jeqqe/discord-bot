const { SlashCommandBuilder } = require('@discordjs/builders')
const { sendAssignmentEmbed } = require('../embeds/roleAssignment')

const { CHANNELS: { ROLE_ASSIGNMENT } } = require('../../config.json')

const { isAdmin } = require('../../utils/permissions')
const { addTimedReply } = require('../../utils/messages')
const { runSubCommandAdd } = require('./roleSubCommands/add')
const { runSubCommandRemove } = require('./roleSubCommands/remove')

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
    if (interaction.channel.id !== ROLE_ASSIGNMENT) {
      addTimedReply(interaction, 'You can\'t use that command in this channel.', 5)
      return
    }
    if (!isAdmin(interaction.member)) {
      addTimedReply(interaction, 'You\'re not allowed to execute this command.', 5)
      return
    }

    switch (interaction.options.getSubcommand()) {
      case 'summon':
        addTimedReply(interaction, 'Fetching embed...', 3)
        sendAssignmentEmbed(interaction.channel, interaction.client.roles)
        break
      case 'add':
        addTimedReply(interaction, 'Adding new role...', 3)
        runSubCommandAdd(interaction)
        break
      case 'remove':
        runSubCommandRemove(interaction)
        break
      default:
        addTimedReply(interaction, 'No valid subcommand found.', 5)
    }
  },
}
