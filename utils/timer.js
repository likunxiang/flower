/***
 * 时间格式化
 */
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ?
        o[k] :
        ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

/***
 * 根据时间戳获取日期时间
 * fmt格式 例：yyyy-MM-dd hh:mm:ss
 */
export function getFormatDate(time, fmt) {
  try {
    var now = new Date(time)
    return now.Format(fmt)
  } catch (e) {
    if (window.console) {
      console.log(e)
    }
  }
}

/***
 * 日期加减函数
 */
export function salcDate(date, days) {
  var d = new Date(date)
  d.setDate(d.getDate() + (days>0?(days-1):(days+1)))
  var m = d.getMonth() + 1
  return d.getFullYear() + '-' + m + '-' + d.getDate()
}


const filterEnd = getFormatDate(new Date(), "yyyy-MM-dd")
const filterstart = salcDate(filterEnd, 7)
const filterDate = [filterstart, filterEnd]
