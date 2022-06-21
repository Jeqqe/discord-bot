import KomiClient from '../../classes/KomiClient'
import KomiRole, { IKomiRole } from '../models/role'

/* DATABASE */
export const createKomiRole = async (
  id: string,
  label: string,
  emoji: string,
  role:string,
) => {
  const newRole = new KomiRole(({
    id, label, emoji, role,
  }))

  const savedRole = await newRole.save()
  KomiClient.getInstance().getAssignmentRoles().push(savedRole)
  return savedRole
}

export const removeKomiRole = async (
  komiRole: IKomiRole,
) => {
  const foundRole = await KomiRole.findOne(komiRole)
  if (!foundRole) return null

  await foundRole.deleteOne()
  KomiClient.getInstance().getAssignmentRoles().filter((role) => role.id === foundRole.id)
  return foundRole
}

/* CLIENT STATE */
export const getKomiRoleById = (id: string) => KomiClient.getInstance()
  .getAssignmentRoles().find((role) => role.id === id)

export const getKomiRoleByLabel = (label: string) => KomiClient.getInstance()
  .getAssignmentRoles().find((role) => role.label === label)

export const getKomiRoleByEmoji = (emoji: string) => KomiClient.getInstance()
  .getAssignmentRoles().find((role) => role.emoji === emoji)

export const getKomiRoleByGuildRole = (guildRole: string) => KomiClient.getInstance()
  .getAssignmentRoles().find((role) => role.role === guildRole)
