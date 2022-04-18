const { ROLES: { ADMIN } } = require('../config.json')

const isAdmin = (member) => member.roles.cache.some((role) => role.name === ADMIN)

module.exports = { isAdmin }
