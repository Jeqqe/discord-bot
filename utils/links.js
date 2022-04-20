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

  try {
    const emote = await guild.emojis.create(url, name)
    return emote
  } catch (_) {
    return false
  }
}

module.exports = { isValidUrl, linkToEmote }
