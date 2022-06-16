import DiscordEvent from '../enums/DiscordEvents'

export default class KomiEvent {
  private name: string

  private once: boolean

  public readonly execute: (...args: any) => Promise<void>

  constructor(
    name: DiscordEvent,
    once: boolean,
    execute: (...args: any) => Promise<void>,
  ) {
    this.name = name
    this.once = once
    this.execute = execute
  }

  public getName() {
    return this.name
  }

  public isOnce() {
    return this.once
  }
}
