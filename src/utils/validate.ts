export const validateEmoteUrlFromString = (s: string): boolean => {
  let url
  try {
    url = new URL(s)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}
