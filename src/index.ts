import 'dotenv/config'
import { Client, Intents } from 'discord.js'
import {
  setupCommands, setupDatabase, setupEvents, setupRoles,
} from './utils/setup'

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

setupEvents(client)
setupCommands()
setupDatabase()
setupRoles()

client.login(process.env.DISCORD_TOKEN)
