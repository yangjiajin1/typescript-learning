/**
 * 第 15 课练习:索引签名、Record 与 keyof
 *
 * 运行方式:
 *   npx tsx lessons/15-索引与keyof/exercise.ts   # 运行本文件
 *   npm run check                          # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   索引签名  → [key: string]: T   "任意字符串键,值都是 T"的字典
 *   Record    → Record<K, V>        "以 K 的每个成员为键、值都是 V"的精确字典
 *   keyof     → keyof T             提取类型 T 的全部键,得到键名字面量联合
 *
 * 核心思维(务必先读懂再动手):
 *   普通 interface 的键是"写死"的:interface User { name: string } 表示"恰好有 name 一个键",
 *   多写一个键名就报错。但真实代码里大量对象是"字典/配置表":
 *   —— 键来自已知有限集合(如订单状态)→ 用 Record<'pending' | 'paid', ...>,键被限制死
 *   —— 键完全未知、任意字符串(如用户传进来的表)→ 用索引签名 [key: string]: T,键不限制
 *   keyof 则是"反向操作":把一个写死的对象类型,取出它的键的联合,好拿去当约束。
 *   三者配合,就能写出"写错键名编译就报错"的代码。
 *
 *   本仓库开了 noUncheckedIndexedAccess:对字典用方括号/点取键时,读出来可能是 undefined
 *   (第 5/6/7 课"数组下标叠加 undefined"的老教训,在对象字典上再复现一次)。
 */

// ============================================================
// 任务 1:读代码,预测类型(先读后写)
// 每一问先在注释里写预测,再运行/悬停验证。
// ============================================================

// ① 索引签名读值
const scoreMap: { [key: string]: number } = { math: 90 }
// ①a 预测:scoreMap.math 的类型是?
// 你的预测: number | undefined
// ①b 预测:const s = scoreMap['english'](键不存在)会编译报错吗?s 的类型是?
// 你的预测: 不会报错，key是srting 没问题， s的类型应该是 number | undefined

// ② Record
type Role = 'admin' | 'editor' | 'viewer'
type Level = Record<Role, number>
// ②a 预测:Level 展开(等价手写)后长什么样?
// 你的预测: { admin: number; editor: number; viewer: number;}
// ②b 判断:下面三行各报不报错?为什么?(先想,再用 check 验证)
const l1: Level = { admin: 3, editor: 2, viewer: 1 } // 这完全按要求写，不报错无需原因吧
// const l2: Level = { admin: 3 }                     // 少写 editor、viewer 对的少些不行
// 类型“{ admin: number; }”缺少类型“Level”中的以下属性: editor, viewer
// const l3: Level = { admin: 3, editor: 2, viewer: 1, boss: 9 }   // 多写 boss  多写也不行
// 对象字面量只能指定已知属性，并且“boss”不在类型“Level”中

// ③ keyof
type Config = { host: string; port: number; debug: boolean }
// ③a 预测:keyof Config 的值是?
// 你的预测: host,port,debug
// ③b 判断:function f<T, K extends keyof T>(obj: T, key: K) { }
//    调用 f({ host: 'x' }, 'host') 合法吗?f({ host: 'x' }, 'id') 呢?为什么?
// 你的预测: f({ host: 'x' }, 'host') 合法 因为host 是 { host: 'x' } 的key  f({ host: 'x' }, 'id') 不合法 id并不在所传对象的key中

// ④ 预测:下面 get 里 obj[key] 的返回类型是?注意 noUncheckedIndexedAccess。
type Dict = { a: string; b: number }
function get<K extends keyof Dict>(obj: Dict, key: K) {
  // 悬停看 obj[key] 的类型
  return obj[key]
}
// 你的预测: string | number | undefined

// ============================================================
// 任务 2:你自己写(本课核心)
// 目标:① 用 Record 重构一张配置表;② 写一个 getValue<T, K extends keyof T> 安全取值。
// 规则:
//   ① 不许用 any
//   ② 写完后悬停确认推断,自己说出"为什么返回类型长这样"
// ============================================================

// ① 用 Record 重构配置表
// 场景:订单有四种状态 'pending' | 'paid' | 'shipped' | 'cancelled',
//   每种状态对应一个"下一步动作"按钮文案(string),存成一张配置表 statusAction。
// 要求:写错状态名(比如 statusAction['pended'])必须编译报错。
// 用 Record 定义这个类型并写一个 statusAction 对象。
// 卡点提示(先自己写,卡住再看):
//   · 类型 = Record<状态联合, string>,键类型是状态,值类型是 string
//   · 对比:如果写成 { [key: string]: string },statusAction['pended'] 还会报错吗?
//     体会两者差别——这就是 Record(键受限)与索引签名(键不受限)的分水岭
type OrderPhase = 'pending' | 'paid' | 'shipped' | 'cancelled'
// ① 你的 statusAction 类型和对象:
type StatusAction = Record<OrderPhase, string>
const statusAction: StatusAction = {
  pending: '去支付',
  paid: '查看物流',
  shipped: '确认收货',
  cancelled: '重新下单'
}
// const statusActionBoj: StatusAction = {
//   pended: 1,
//   paid: 2,
//   shipped: 1,
//   cancelled: 1
// }
// 对象字面量只能指定已知属性，并且“pended”不在类型“StatusAction”中。

// ② 写 getValue<T, K extends keyof T> 安全取值
// 目标:getValue(obj, key) 返回 obj[key]。
// 场景:有一份 ServerConfig,调用 getValue(cfg, 'host') 取到 string,getValue(cfg, 'port') 取到 number。
// 要求:
//   · 写错键名(如 getValue(cfg, 'ip'))编译报错
//   · 返回类型要"诚实":在 noUncheckedIndexedAccess 下,obj[key] 可能是 undefined
//   · 卡点:别急着给返回类型下结论,先把 body 写成 return obj[key],悬停看推断,再回来写注解
//     提示:泛型键下 obj[key] 的推断可能是 T[K](写死键)或 T[K] | undefined(动态键)
interface ServerConfig {
  host: string
  port: number
  debug: boolean
}
// ② 你的 getValue(签名与 body 都由你写,写完再取消③的验证):
function getValue<T, K extends keyof T>(obj:T, key:K): T[K] {
  return obj[key]
}
// ③ 消费验证(不改这下面)
const cfg: ServerConfig = { host: 'localhost', port: 3000, debug: false }
// 取消注释验证,悬停确认类型:
const host = getValue(cfg, 'host')   // string
const port = getValue(cfg, 'port')   // number
console.log(host, port)
// getValue(cfg, 'ip')
// 类型“"ip"”的参数不能赋给类型“keyof ServerConfig”的参数