const isValidUrl = (string) => {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

const linkToEmote = (guild, url, name) => {
  if (!isValidUrl(url)) return false
  return guild.emojis.create(url, name).then((emoji) => emoji)
}

module.exports = { isValidUrl, linkToEmote }
