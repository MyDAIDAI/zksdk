export function dateToTimestamp (date, isSub = false) {
  if (!date) {
    return false
  }
  let timestamp = Date.parse(new Date(date))
  return isSub ? timestamp.toString().substr(0, 7) : timestamp
}

export function timestampToDate (timestamp, type = 'second') {
  if (!timestamp) {
    return ''
  }
  let date = new Date(timestamp) 
  let y = date.getFullYear()   
  let m = date.getMonth() + 1   
  m = m < 10 ? ('0' + m) : m   
  let d = date.getDate()   
  d = d < 10 ? ('0' + d) : d   
  let h = date.getHours() 
  h = h < 10 ? ('0' + h) : h 
  let minute = date.getMinutes() 
  let second = date.getSeconds() 
  minute = minute < 10 ? ('0' + minute) : minute   
  second = second < 10 ? ('0' + second) : second
  if (type === 'day') {
    return y + '-' + m + '-' + d
  }
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}