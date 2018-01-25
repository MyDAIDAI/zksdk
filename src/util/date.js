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
/*
对Date的扩展，将 Date 转化为指定格式的String
月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
(new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
(new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
*/
Date.prototype.format = function (fmt = 'yyyy-MM-dd') { // author: meizz
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}