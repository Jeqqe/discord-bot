const { CHANNELS: { ROLE_ASSIGNMENT }} = require('../../config.json')

module.exports = {
  name: 'messageReactionRemove',
  once: false,
  async execute(reaction, user, client) {
	  if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message:', error);
        return;
      }
	  }

    if (reaction.message.channel.id !== ROLE_ASSIGNMENT) return
    if (reaction.message.author.id === user.id) return

    const role = client.roles.find((role) => role.emote === reaction.emoji.toString())
    const guildRole = reaction.message.guild.roles.cache.find((guildRole) => guildRole.id === role.id)
    const member = reaction.message.guild.members.cache.find((member) => member.user.id === user.id)

    member.roles.remove(guildRole)
  },
}