/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

require('dotenv').config()
const fs = require('fs')
const { Client, Collection, Intents } = require('discord.js')
const mongoose = require('mongoose')

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

const { getAllRoles } = require('./controllers/roles')

// Connecting to mongoDB
console.log('Connecting to', process.env.MONGODB_URI)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to mongoDB:', error.message)
  })

// Loading COMMANDS from ./src/commands
const commandFiles = fs
  .readdirSync('./src/commands')
  .filter((file) => file.endsWith('.js') && file !== 'deployCommands.js')

commandFiles.forEach((file) => {
  const command = require(`./src/commands/${file}`)
  client.commands.set(command.data.name, command)
})

// Loading EVENTS from ./src/commands
const eventFiles = fs
  .readdirSync('./src/events')
  .filter((file) => file.endsWith('.js'))

eventFiles.forEach((file) => {
  const event = require(`./src/events/${file}`)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args, client))
  }
})

client.once('ready', async () => {
  const allRoles = await getAllRoles()
  client.roles = allRoles
  console.log('Application ready.')
})

client.login(process.env.DISCORD_TOKEN)
