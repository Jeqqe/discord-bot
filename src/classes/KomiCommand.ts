import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

import KomiSubCommand from './KomiSubCommand'

export default class KomiCommand {
  private command: SlashCommandBuilder

  private name: string

  private description: string

  private commandExecute: ((interaction: CommandInteraction) => Promise<void>) | null

  private subCommands: Array<KomiSubCommand> | null

  constructor(
    name: string,
    description: string,
    commandOptions: {
      commandExecute?: (interaction: CommandInteraction) => Promise<void>,
      subCommands?: Array<KomiSubCommand>,
    },
  ) {
    this.command = new SlashCommandBuilder()
      .setName(name)
      .setDescription(description)
    this.name = name
    this.description = description
    this.commandExecute = commandOptions.commandExecute ?? null
    this.subCommands = commandOptions.subCommands ?? null

    if (commandOptions.subCommands) {
      commandOptions.subCommands.forEach(
        (subCommand) => this.command.addSubcommand(subCommand.getSubCommand()),
      )
    }
  }

  public getName() {
    return this.name
  }

  public getDescription() {
    return this.description
  }

  public getCommand() {
    return this.command
  }

  public getSubCommands() {
    return this.subCommands
  }

  public async execute(interaction: CommandInteraction) {
    if (this.commandExecute) {
      await this.commandExecute(interaction)
    }

    if (!this.subCommands) return
    const foundSubCommand = this.subCommands.find(
      (subCommand) => subCommand.getSubCommand().name.toLowerCase()
      === interaction.options.getSubcommand().toLowerCase(),
    )

    if (!foundSubCommand) return
    await foundSubCommand.execute(interaction)
  }
}
