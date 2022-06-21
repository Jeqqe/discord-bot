import 'dotenv/config'

import KomiClient from './classes/KomiClient'

const start = async () => {
  const client = new KomiClient()

  await client.setupDatabase()

  await client.loadCommands()
  console.log('Commands loaded.')

  client.deployCommands()

  await client.loadEvents()
  console.log('Events loaded.')

  if (!(await client.start())) process.exit(1)
}

start()
