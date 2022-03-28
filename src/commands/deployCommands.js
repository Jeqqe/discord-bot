/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

require('dotenv').config()
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('fs')

const commands = []
const commandFiles = fs
  .readdirSync('./src/commands')
  .filter((file) => file.endsWith('.js') && file !== 'deployCommands.js')

commandFiles.forEach((file) => {
  const command = require(`./${file}`)
  commands.push(command.data.toJSON())
})

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  )
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error)
