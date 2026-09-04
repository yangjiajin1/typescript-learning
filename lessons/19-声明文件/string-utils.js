// string-utils.js —— 一个"零类型信息"的老 JS 库
//
// 假装它是你从 npm 装来、维护者早跑路、没有配套 @types 的老包。
// 关键:这里没有任何 TypeScript —— 它只是纯 JS,TS 编译器对里面的函数签名一无所知。
//
// 库的行为说明(给人看的;机器读不出任何类型):
//   toUpper(s)        -> 字符串转大写(内部 s.toUpperCase())
//   pad(s, len, ch?)  -> 用 ch(默认空格)在左侧把 s 补到 len 长;本身比 len 长则截掉尾部
//   splitLines(s)     -> 按换行符 \r?\n 拆成"行"数组
//   version           -> 库版本号,一个字符串
//   defaultOptions    -> 默认配置对象(trim / keepEmpty 两个布尔开关)

function toUpper(s) {
  return s.toUpperCase()
}

function pad(s, len, ch) {
  ch = ch || ' '
  while (s.length < len) s = ch + s
  return s.slice(-len)
}

function splitLines(s) {
  return s.split(/\r?\n/)
}

const version = '1.0.0'
const defaultOptions = { trim: true, keepEmpty: false }

module.exports = { toUpper, pad, splitLines, version, defaultOptions }
