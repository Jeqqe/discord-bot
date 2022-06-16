import { SlashCommandSubcommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export default class KomiSubCommand {
  private command: SlashCommandSubcommandBuilder

  public readonly execute: (interaction: CommandInteraction) => Promise<void>

  constructor(
    command: SlashCommandSubcommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void>,
  ) {
    this.command = command
    this.execute = execute
  }

  public getSubCommand() {
    return this.command
  }
}
