/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

require('dotenv').config()
const { Client, Collection, Intents } = require('discord.js')
const {
  setupDatabase, setupCommands, setupEvents, checkForUpdates
} = require('./utils/setup')
const { getAllRoles } = require('./controllers/roles')

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

client.commands = new Collection()
client.roles = []

setupDatabase()
setupCommands(client)
setupEvents(client)

client.once('ready', async () => {
  const allRoles = await getAllRoles()
  client.roles = allRoles

  checkForUpdates(client)

  console.log('Application ready.')
})

client.login(process.env.DISCORD_TOKEN)
module.exports = { client }
