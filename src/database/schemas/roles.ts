import mongoose from 'mongoose'

const rolesSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  displayname: {
    type: String,
    required: true,
  },
  emote: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Roles', rolesSchema)
