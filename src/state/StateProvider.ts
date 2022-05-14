export interface StateData {
  name: StateType
  data: unknown
}

export enum StateType {
  ROLES = 'ROLES',
  COMMANDS = 'COMMANDS',
}

class StateProvider {
  private static instance: StateProvider

  private stateData: StateData[] = [
    {
      name: StateType.ROLES,
      data: [],
    },
    {
      name: StateType.COMMANDS,
      data: [],
    },
  ]

  public static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new StateProvider()
    return this.instance
  }

  public getItem(name: StateType) {
    return this.stateData.find((state) => state.name === name)
  }

  public addItem(name: StateType, data: StateData) {
    this.stateData = [
      ...this.stateData,
      { name, data },
    ]
  }

  public removeItem(name: StateType) {
    this.stateData = this.stateData.filter((stateItem) => stateItem.name === name)
  }

  public updateItem(name: StateType, data: unknown[]) {
    this.stateData = this.stateData.map((stateItem) => {
      if (stateItem.name !== name) return stateItem
      return { name, data }
    })
  }
}

export default StateProvider
