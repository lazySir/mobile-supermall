export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 时间格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  }
}

export function getTime(){
  let d = new Date()//获取系统当前时间
  
  let Year = d.getFullYear(),//获取年份
      Month=d.getMonth()+1,//获取月份
      Day=d.getDate(),
      Hours=d.getHours(),
      Minutes=d.getMinutes(),
      Seconds=d.getSeconds()
  
  return Year + '-' + Month + '-' + Day  + ' ' + Hours + ':'+Minutes+':'+Seconds
  }