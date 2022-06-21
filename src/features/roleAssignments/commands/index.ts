import KomiCommand from '../../../classes/KomiCommand'

import add from './subCommands/add'
import remove from './subCommands/remove'

export default new KomiCommand(
  'roles',
  'Role assignment related commands',
  {
    subCommands: [
      add,
      remove,
    ],
  },
)
