import KomiClient from '../classes/KomiClient'

enum KomiChannels {
  RoleAssignments = '988831069694480434',
}

export const getKomiChannel = (
  komiChannel: KomiChannels,
) => KomiClient.getInstance().getHomeGuild().channels.cache.get(komiChannel)

export default KomiChannels
