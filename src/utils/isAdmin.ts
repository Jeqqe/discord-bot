import { GuildMember } from 'discord.js'

export default (member: GuildMember) => (!!((member).roles.cache.find(
  (role) => role.name === process.env.ADMIN_ROLE_NAME,
)))
