// 语法备注：模版字符串-标签函数
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals#%E5%B8%A6%E6%A0%87%E7%AD%BE%E7%9A%84%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2
// String.prototype.trim() 从字符串的两端清除空格，返回一个新的字符串

'use strict'

function trim(strings, ...args) {
  const array = [strings[0]]
  for (let i = 0; i < args.length; i++) {
    array.push(args[i], strings[i + 1])
  }
  return array.flatMap(it => it.split('\n'))
    .map(it => it.trim())
    .join('')
}

module.exports = {
  trim // 模版字符串压缩
}