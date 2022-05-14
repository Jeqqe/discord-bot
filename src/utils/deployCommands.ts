import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env

// Fetch slashCommand files as JSON
const componentFiles = fs
  .readdirSync('./src/components')

componentFiles.reduce(async (commands: Promise<JSON[]>, component) => {
  const componentPath = path.resolve(__dirname, `../components/${component}/deploy.ts`)
  if (fs.existsSync(componentPath)) {
    const module = await import(componentPath);
    (await commands).push(module.default.toJSON())
  }
  return commands
}, Promise.resolve([]))

// Upload slashCommands to discord

  .then((commands) => {
    const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN as string)
    rest
      .put(
        Routes.applicationGuildCommands(
          CLIENT_ID as string,
          GUILD_ID as string,
        ),
        { body: commands },
      )
      .then(() => console.log('Successfully registered application commands.'))
      .catch((error) => console.log(error))
  })
