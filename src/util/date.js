export function dateToTimestamp (date, isSub = false) {
  if (!date) {
    return false
  }
  let timestamp = Date.parse(new Date(date))
  return isSub ? timestamp.toString().substr(0, 7) : timestamp
}