const isValidUrl = (string) => {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

const linkToEmote = async (guild, url, name) => {
  if (!isValidUrl(url)) return false
  const emote = guild.emojis.create(url, name)
  if (!emote) return false
  return emote
}

module.exports = { isValidUrl, linkToEmote }
