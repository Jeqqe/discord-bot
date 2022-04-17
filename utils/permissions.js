const { ROLES: { ADMIN }} = require('../config.json')

const isAdmin = (member) => {
  return member.roles.cache.some(role => role.name === ADMIN)
}

module.exports = { isAdmin }