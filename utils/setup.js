/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const mongoose = require('mongoose')
const fs = require('fs')

const { CHANNELS: { KOMI_UPDATES } } = require('../config.json')
const { sendBotUpdateEmbed } = require('../src/embeds/botUpdates')

const setupDatabase = () => {
  console.log('Connecting to', process.env.MONGODB_URI)
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.error('Error connecting to mongoDB:', error.message)
    })
}

const setupCommands = (client) => {
  const commandFiles = fs
    .readdirSync('./src/commands')
    .filter((file) => file.endsWith('.js') && file !== 'deployCommands.js')

  commandFiles.forEach((file) => {
    const command = require(`../src/commands/${file}`)
    client.commands.set(command.data.name, command)
  })
}

const setupEvents = (client) => {
  const eventFiles = fs
    .readdirSync('./src/events')
    .filter((file) => file.endsWith('.js'))

  eventFiles.forEach((file) => {
    const event = require(`../src/events/${file}`)
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args))
    } else {
      client.on(event.name, (...args) => event.execute(...args, client))
    }
  })
}

const checkForUpdates = (client) => {
  if (process.argv.length <= 2) return

  const message = process.argv.slice(2).join(' ')
  const title = message.split('\\n')[0]
  const description = message.split(`${title}\\n`)[1].split('\\n')

  const matchedGuild = client.guilds.cache.find((guild) => guild.id === process.env.GUILD_ID)
  const matchedChannel = matchedGuild.channels.cache.find((channel) => channel.id === KOMI_UPDATES)

  sendBotUpdateEmbed(matchedChannel, title, description)
}

module.exports = {
  setupDatabase,
  setupCommands,
  setupEvents,
  checkForUpdates
}
