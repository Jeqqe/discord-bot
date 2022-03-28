/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

require('dotenv').config()
const fs = require('fs')
const { Client, Collection, Intents } = require('discord.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
client.commands = new Collection()

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
    client.on(event.name, (...args) => event.execute(...args))
  }
})

client.once('ready', () => {
  console.log('Ready!')
})

client.login(process.env.DISCORD_TOKEN)
