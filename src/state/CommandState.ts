import { Command } from '../types/interfaces'
import StateProvider, { StateType } from '../classes/StateProvider'

export interface CommandsState {
  name: StateType.COMMANDS,
  data: Command[]
}

export const getCommandsState = (): Command[] => (StateProvider.getInstance()
  .getItem(StateType.COMMANDS) as CommandsState).data

export const getCommandFromState = (filter: string) => getCommandsState().find(
  (command: Command) => command.name.toUpperCase() === filter.toUpperCase(),
)

export const addCommandToState = (command: Command) => StateProvider
  .getInstance().updateItem(StateType.COMMANDS, [
    ...getCommandsState(),
    command,
  ])
