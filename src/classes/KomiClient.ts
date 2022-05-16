import { Client, ClientOptions } from 'discord.js'

class KomiClient extends Client {
  private static instance: KomiClient

  constructor(options: ClientOptions) {
    super(options)

    KomiClient.instance = this
  }

  public static getInstance() {
    return this.instance
  }
}

export default KomiClient
