import { SlashCommandBuilder } from '@discordjs/builders'

export default new SlashCommandBuilder()
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
      .setRequired(true)))
