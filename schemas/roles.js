const mongoose = require('mongoose')

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
  }
})

module.exports = mongoose.model('Role', rolesSchema)
