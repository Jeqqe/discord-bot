/* eslint-disable import/prefer-default-export */
import { GuildMember } from 'discord.js'
import { Role } from '../config'

export const isAdmin = (member: GuildMember) => member.roles.cache.some(
  (role) => role.name === Role.ADMIN,
)
