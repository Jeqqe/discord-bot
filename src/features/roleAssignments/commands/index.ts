import KomiCommand from '../../../classes/KomiCommand'

import add from './subCommands/add'
import remove from './subCommands/remove'
import setup from './subCommands/setup'

export default new KomiCommand(
  'roles',
  'Role assignment related commands',
  {
    subCommands: [
      add,
      remove,
      setup,
    ],
  },
)
