/**
 * 第 8 课练习:交叉类型与接口扩展
 *
 * 运行方式:
 *   npx tsx lessons/08-交叉类型/exercise.ts   # 运行本文件
 *   npm run check                             # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   A & B        → 交叉类型:同时拥有 A 和 B 的所有成员(联合是"或",交叉是"和")
 *   interface extends → 接口继承,对象扩展推荐用它
 *   同名属性     → 两边类型相同 → 合法;不同 → never(第 4 课错题,今天复习)
 *   取舍         → 对象扩展用 extends;type/primitive 组合用 &
 *
 * 任务 1:感受 & 的组合。
 *   a) 定义 type Named = { name: string } 和 type Timed = { duration: number }
 *   b) 用 & 组合成 type Track = Named & Timed
 *   c) 写一个对象 obj 符合 Track(两个成员都要给)
 *   d) 试试:只给 name 不给 duration → npm run check,观察报错
 *      (报错在说:缺了 & 组合出来的哪个成员?)
 *
 * 任务 2:给 Track 再加"可序列化"能力。
 *   a) 定义 type Serializable = { toJSON(): string }
 *   b) 组合成 type TrackFull = Named & Timed & Serializable(三个揉一起)
 *   c) 写个对象符合 TrackFull;调一下 obj.toJSON(),运行看结果
 *   d) 思考(写注释):& 能揉多少个?相比 interface extends 连写 extends 哪个更麻烦?
 *
 * 任务 3:用 interface extends 写同样的东西。
 *   a) 用 interface Named2、Timed2,让 Track2 extends 两个(interface 支持 extends 多个)
 *   b) 写对象验证:Track2 和 TrackFull 的结果类型是不是等价?写注释说说你的感受
 *      (提示:都是"同时拥有"那几个成员——殊途同归)
 *
 * 任务 4:同名属性——验证第 4 课错题。
 *   a) 定义 type A = { name: string }、type B = { name: string; title: string }
 *      type C = A & B。C 里的 name 是什么类型?能用吗?写注释预判,再写个对象验证
 *   b) 定义 type D = A & { name: number }。构造一个 D 的对象 → 报错吗?
 *      (提示:name 要同时是 string 又是 number → ____)
 *      D 的 name 类型是什么?写注释
 *   c) 对比:interface E extends A { name: number } → 报错吗?报错信息跟 b) 有什么不同?
 *      (extends 对同名不同型是"拒绝",& 是"产生 never 后再炸"——感觉一下差异)
 *
 * 任务 5:取舍思考(写注释即可)。
 *   下面三个场景,你会用 & 还是 extends?各写一句理由。
 *   a) 业务里一个"用户"对象,想在基础版上加"管理员字段"
 *   b) 一个 type 别名(比如 union 或 mapped 产生的),想给它加字段
 *   c) 想表达"一个既支持数字又限制为某个字面量"的类型(如只能是 1 | 2 的 number)
 */

// ===== 任务 1:感受 & 的组合 =====
// a) 你的代码:
type Named = { name: string }
type Timed = { duration: number }
// b) type Track = ...
type Track = Named & Timed
// c) 验证对象:
// const obj: Track = {
//   name: "song",
//   duration: 180,
// }
// console.log(obj)

// d) 只给 name 不给 duration 的报错:__
// const obj: Track = {
//   name: "song"
// }
// Type '{ name: string; }' is not assignable to type 'Track'.Property 'duration' is missing in type '{ name: string; }' but required in type 'Timed'
// ===== 任务 2:可序列化能力 =====
// a) type Serializable = ...
type Serializable = { toJSON(): string }
// b) type TrackFull = ...
type TrackFull = Named & Timed & Serializable
// c) 验证对象 + 调 toJSON():
const obj2:TrackFull = {
  name: "song",
  duration: 180,
  toJSON() {
    return `{"name":"${this.name}","duration":${this.duration}}`
  }
}
console.log(obj2.toJSON())

// d) 思考:_能揉多少取决于想揉多少，相比interface extends 不好说 _

// ===== 任务 3:interface extends =====
// a) 你的代码:
interface TrackFull2 extends Named, Timed, Serializable {}
// b) 感受:_结果是一样的，个人看起来还是extends更舒服_
const trackFull2: TrackFull2 = {
  name: "song",
  duration: 180,
  toJSON() {
    return `{"name":"${this.name}","duration":${this.duration}}`
  }
}
console.log(trackFull2.toJSON())
// ===== 任务 4:同名属性 =====
type A = { name: string }
type B = { name: string; title: string }
type C = A & B
const cc: C = {
  name: "song",
  title: "title"
}
// a) C 的 name 类型预判:_string_  验证:_name: string_
type D = A & { name: number }
// const dd: D = {
//   name: 123
// }
// b) D 构造报错?_报错_  D 的 name 类型:_不能将类型“number”分配给类型“never”_
// interface E extends A { name: number }
// c) E 报错?_报错_  和 b) 的差异:_接口“E”错误扩展接口“A”。属性“name”的类型不兼容。不能将类型“number”分配给类型“string”_
// 定义时就报错  & 使用时才报错
// ===== 任务 5:取舍思考 =====
// a) 用 __extends__,理由:_本质是继承 补充字段,而且能用就用_
// b) 用 __&__,理由:_别名只能用&_
// c) 用 __&__,理由:_字面量无法使用extends 用&_

type Status2 = "on" | "off"
  // 1. 取消注释下面这行,看 check 报什么:
  // interface Bad2 extends Status2 {}
  //接口只能扩展使用静态已知成员的对象类型或对象类型的交集
  // 2. 取消注释下面这行,看运行/check 表现:
  // const s: Status2 & { note: string } = { note: 'x' }   // 报什么?
  // 不能将类型“{ note: string; }”分配给类型“Status2 & { note: string; }”。
  // 不能将类型“{ note: string; }”分配给类型“"off" & { note: string; }”。
  //   不能将类型“{ note: string; }”分配给类型“"off"”
  // 3. 这个才对:
  const good2: { status: Status2; note: string } = { status: "on", note: "x" }
  console.log(good2)
  // { status: 'on', note: 'x' }