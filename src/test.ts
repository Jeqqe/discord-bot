import 'dotenv/config'
import mongoose from 'mongoose'
import KomiRole from './database/models/role'
import GeneralMessages from './locale/GeneralMessages'

const test = async () => {
  await mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log(GeneralMessages.databaseConnected))
    .catch(() => console.log(GeneralMessages.databaseConnectedError))

  const roles = await KomiRole.find({})
  console.log(roles)
}

test().then(() => console.log('ran'))
