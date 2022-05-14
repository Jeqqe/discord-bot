import { DiscordEvent } from './enums'

export interface DiscordEventListener {
  interaction: DiscordEvent;
  once: boolean;
  execute: (...args: any[]) => Promise<void>;
}

export interface Command {
  name: string;
  execute(...args: any[]): Promise<void>
}

export interface Role {
  id: string
  name: string
  displayname: string
  emote: string
}
