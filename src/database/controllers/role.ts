import KomiClient from '../../classes/KomiClient'
import KomiRoleTypes from '../../enums/KomiRoleTypes'
import KomiRole, { IKomiRole } from '../models/role'

/* DATABASE */
export const createKomiRole = async (
  id: string,
  type: KomiRoleTypes,
  label: string,
  emoji: string,
  role:string,
) => {
  const newRole = new KomiRole(({
    id, type, label, emoji, role,
  }))

  const savedRole = await newRole.save()
  KomiClient.getInstance().assignmentRoles.push(savedRole)
  return savedRole
}

export const removeKomiRole = async (
  komiRole: IKomiRole,
) => {
  const foundRole = await KomiRole.findOne(komiRole)
  if (!foundRole) return null

  await foundRole.deleteOne()
  KomiClient.getInstance().assignmentRoles = KomiClient.getInstance().assignmentRoles
    .filter((role) => role.id !== foundRole.id)
  return foundRole
}

/* CLIENT STATE */
export const getKomiRolesByType = (type: KomiRoleTypes) => KomiClient.getInstance()
  .assignmentRoles.find((role) => role.type === type)

export const getKomiRoleById = (id: string) => KomiClient.getInstance()
  .assignmentRoles.find((role) => role.id === id)

export const getKomiRoleByLabel = (label: string) => KomiClient.getInstance()
  .assignmentRoles.find((role) => role.label === label)

export const getKomiRoleByEmoji = (emoji: string) => KomiClient.getInstance()
  .assignmentRoles.find((role) => role.emoji === emoji)

export const getKomiRoleByGuildRole = (guildRole: string) => KomiClient.getInstance()
  .assignmentRoles.find((role) => role.role === guildRole)
