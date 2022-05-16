import { Role } from '../types/interfaces'
import StateProvider, { StateType } from '../classes/StateProvider'

export interface RolesState {
  name: StateType.ROLES,
  data: Role[]
}

export const getRolesState = (): Role[] => (StateProvider.getInstance()
  .getItem(StateType.ROLES) as RolesState).data

export const getRoleFromStateByName = (filter: string) => getRolesState().find(
  (role: Role) => role.name.toUpperCase() === filter.toUpperCase(),
)

export const getRoleFromStateByID = (filter: string) => getRolesState().find(
  (role: Role) => role.id.toUpperCase() === filter.toUpperCase(),
)

export const getRoleFromStateByDisplayname = (filter: string) => getRolesState().find(
  (role: Role) => role.displayname.toUpperCase() === filter.toUpperCase(),
)

export const getRoleFromStateByEmote = (filter: string) => getRolesState().find(
  (role: Role) => role.emote.toUpperCase() === filter.toUpperCase(),
)

export const addRolesToState = (roles: Role[]) => StateProvider
  .getInstance().updateItem(StateType.ROLES, roles)

export const addRoleToState = (role: Role) => StateProvider
  .getInstance().updateItem(StateType.ROLES, [
    ...getRolesState(),
    role,
  ])

export const removeRoleFromState = (role: Role) => StateProvider
  .getInstance().updateItem(
    StateType.ROLES,
    getRolesState().filter((stateRole) => stateRole.id !== role.id),
  )
