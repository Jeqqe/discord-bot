import { Guild } from 'discord.js'

interface KomiGuildSettings {
  adminRoleID: string
  
}

class KomiGuild {
  private guild: Guild
  private settings

  constructor(guild: Guild) {
    this.guild = guild
  }

}
