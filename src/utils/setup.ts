import { Client } from 'discord.js'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import { addCommandToState } from '../state/CommandState'
import { addRolesToState } from '../state/RolesState'
import { getAllRoles } from '../database/controllers/roles'
// import StateProvider from '../state/StateProvider'

export const setupDatabase = () => {
  console.log('Connecting to', process.env.MONGODB_URI)
  mongoose
    .connect(process.env.MONGODB_URI ?? '')
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.error('Error connecting to mongoDB:', error.message)
    })
}

export const setupRoles = async () => {
  console.log('Loading roles...')

  addRolesToState(await getAllRoles())

  console.log('Roles loaded.')
}

export const setupCommands = async () => {
  console.log('Loading commands...')

  const componentFiles = fs
    .readdirSync('./src/components')

  componentFiles.forEach(async (component) => {
    const componentPath = path.resolve(__dirname, `../components/${component}/commands/${component}.ts`)

    if (fs.existsSync(componentPath)) {
      const module = await import(componentPath)
      addCommandToState({
        name: component,
        execute: module.default,
      })
    }
  })

  console.log('Commands loaded.')
}

export const setupEvents = (client: Client) => {
  console.log('Loading events...')
  const componentFiles = fs
    .readdirSync('./src/components')

  const eventFiles = componentFiles.reduce((eventFileList: string[], component) => {
    const componentPath = path.resolve(__dirname, `../components/${component}/events`)
    if (fs.existsSync(componentPath)) {
      return eventFileList.concat(fs.readdirSync(componentPath).map((fileName) => `${componentPath}/${fileName}`))
    }
    return eventFileList
  }, [])

  eventFiles.forEach(async (filePath) => {
    const event = await import(filePath)
    if (event.default.once) {
      client.once(event.default.interaction, (...args) => event.default.execute(...args))
    } else {
      client.on(event.default.interaction, (...args) => event.default.execute(...args))
    }
  })

  console.log('Events loaded.')
}
