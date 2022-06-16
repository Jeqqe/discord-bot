import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client, Collection, Intents } from 'discord.js'
import { existsSync } from 'fs'
import glob from 'glob'

import KomiCommand from './KomiCommand'
import KomiEvent from './KomiEvent'

export default class KomiClient extends Client {
  private static instance: KomiClient

  public commands: Collection<string, KomiCommand>

  constructor() {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      ],
      partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    })

    if (!KomiClient.instance) {
      KomiClient.instance = this
    }

    this.commands = new Collection()
  }

  public static getInstance() {
    return this.instance
  }

  public start() {
    this.login(process.env.DISCORD_TOKEN)
  }

  public async loadCommands() {
    const paths = glob.sync('src/features/*')

    const commandModules = await Promise.all(paths.map((path) => {
      const komiCommandPath = `${path}/commands/index.ts`
      if (!existsSync(komiCommandPath)) return null
      return import(`../../${komiCommandPath}`).then((module) => module.default as KomiCommand)
    }))

    commandModules.forEach((command) => {
      if (!command) return
      this.commands.set(command.getName(), command)

      console.log(`Command: ${command.getName()} | ${command.getDescription()} loaded.`)
    })
  }

  public deployCommands() {
    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN!)

    rest
      .put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID!,
          process.env.HOME_GUILD_ID!,
        ),
        { body: this.commands.map((command) => command.getCommand().toJSON()) },
      )
      .then(() => console.log('Successfully registered application commands.'))
      .catch(console.error)
  }

  public async loadEvents() {
    const paths = glob.sync('src/features/*')

    const events: Promise<KomiEvent>[] = []
    paths.forEach((path) => {
      const featureEventPaths = glob.sync(`${path}/events/*`)
      featureEventPaths.forEach((featureEventPath) => {
        if (!existsSync(featureEventPath)) return
        events.push(import(`../../${featureEventPath}`).then((module) => module.default as KomiEvent))
      })
    })

    const eventModules = await Promise.all(events)

    eventModules.forEach((event) => {
      if (!event) return
      if (event.isOnce()) {
        this.once(event.getName(), (...args) => event.execute(...args))
      } else {
        this.on(event.getName(), (...args) => event.execute(...args))
      }
    })
  }
}
