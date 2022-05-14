import { CommandInteraction, GuildMember } from 'discord.js'
// import { Channel } from '../../../config'
import { isAdmin } from '../../../utils/permissions'

import subCommandSummon from './summon'
import subCommandAdd from './add'
import subCommandRemove from './remove'
import { addTimedInteractionReply } from '../../../utils/messages'

export default async (interaction: CommandInteraction) => {
  if (!interaction || !interaction.channel) return

  /*
  if (interaction.channel.id !== Channel.ROLE_ASSIGNMENT) {
    interaction.reply('You can\'t use that command in this channel.')
    return
  }
  */
  if (!isAdmin(interaction.member as GuildMember)) {
    addTimedInteractionReply(interaction, 'You\'re not allowed to execute this command.', 3)
    return
  }

  switch (interaction.options.getSubcommand()) {
    case 'summon':
      // summon.ts
      subCommandSummon(interaction)
      break
    case 'add':
      // add.ts
      subCommandAdd(interaction)
      break
    case 'remove':
      // remove.ts
      subCommandRemove(interaction)
      break
    default:
      addTimedInteractionReply(interaction, 'No valid subcommand found.', 3)
  }
}
