/**
 * 第 12 课练习:泛型入门
 *
 * 运行方式:
 *   npx tsx lessons/12-泛型入门/exercise.ts   # 运行本文件
 *   npm run check                          # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   泛型          → 类型占位符。把函数写成"带 T 的模板",调用时由 TS 确定 T
 *   推断          → 调用时 TS 根据实参自动猜出 T(identity(42) → T = 42,字面量)
 *   显式指定      → 调用时手动写 <number>(少数场景才需要,通常可省)
 *   extends 约束  → 限定 T 必须满足某个形状,把泛型的范围收住
 *
 * 核心思维(务必先读懂再动手):
 *   function identity<T>(x: T): T
 *     读法:T 是占位符;参数 x 和返回值是"同一个 T"。
 *     identity(42)      → T 被推断为字面量 42(泛型推断不拓宽!)
 *     identity("abc")    → T 被推断为字面量 "abc"
 *     字面量更精确,但 42 是 number 的子类型,需要 number 的地方照样能用
 *   同一个函数、不同调用,类型各自确定——但每次调用里"入参类型 = 返回类型"这个关系不变。
 *   泛型的价值:在类型之间建立"关系",而不是把类型写死。
 *
 *   为什么不用 any?
 *     function identityAny(x: any): any
 *     这也能"什么类型都收",但返回值变成 any,
 *     调用方拿到的类型信息全丢,还得自己收窄(第 11 课教训)。
 *     泛型保留关系:返回值跟着参数走,调用方不用收窄。
 */

// ============================================================
// 任务 1:读代码,预测 T(先读后写)
// 下面 identity 已完整实现。每一问都在注释里先写你的预测,
// 全部预测完再运行 npx tsx 看输出、npm run check 看类型是否如你所料。
// ============================================================
function identity<T>(x: T): T {
  return x
}

// ① 预测:identity(42) 的 T 被推断成?返回值的类型是?
// 你的预测: number
console.log(typeof identity(42))

// ② 预测:identity("hello") 的 T = ?  返回值类型 = ?
// 你的预测: srting
console.log(typeof identity("hello"))
// ③ 预测:identity([1, 2, 3]) 的 T = ?(提示:数组本身也是一个值)
// 你的预测: object
console.log(typeof identity([1, 2, 3]))
// ④ identity<number>(42) 这种"显式指定"和 identity(42) 有什么区别?
//    什么情况下才需要显式写 <number>?(提示:想不出来就跳,任务 2 会遇到)
// 你的预测: 跳过

// ⑤ 下面的代码会报错吗?为什么?
//    const s = identity(42).toUpperCase()
// 你的预测: 会 类型会被推断为bumber  无法调用toUpperCase
// identity(42).toUpperCase()
// 类型“42”上不存在属性“toUpperCase”
// ============================================================
// 任务 2:自己实现 firstItem 和 id(本课核心,你写)
// (firstItem 原名 first,但第 5 课已有一个 first —— 本仓库所有文件共享全局作用域,重名会撞)
// firstItem:接受任意类型数组,返回"第一个元素"(不修改原数组)
//   firstItem([10, 20, 30]) → 10(number)
//   firstItem(["a", "b"])   → "a"(string)
// id:接受任意类型,原样返回,类型保持不变(identity 的翻版,换个名字避免重名)
// 规则:
//   ① 不许用 any
//   ② 返回类型必须跟着"数组的元素类型"走——不能写死 number 或 string
// 卡点提示:
//   · 签名设计:firstItem 用<T> 接收"元素类型",参数写 T[],返回 T
//   · 先想清楚签名,再填 body;写完把鼠标悬停在 firstNum / firstStr 上看推断出的类型
//   · id 同理:参数 T,返回 T,body 就一行
// ============================================================

// 你的 firstItem(自己设计参数和返回类型):
function firstItem<T>(arr: T[]): T | undefined {
  // 你的实现
  return arr[0]
}
const firstNum = firstItem([10, 20, 30])   // 悬停看类型,应是 number
// number | undefined
const firstStr = firstItem(["a", "b"])     // 悬停看类型,应是 string
// string | undefined

// 你的 id:
function id<T>(item: T): T {
  // 你的实现
  return item
}
const idNum = id(42)                   // 悬停看类型,应是 number
// 42
const idObj = id({ a: 1 })             // 悬停看类型,应是 { a: number }
// {
//     a: number;
// }

// ============================================================
// 任务 3:带约束的 pluck(obj, key)(进阶,你写)
// 目标:
//   pluck({ name: "张三", age: 18 }, "name") → 返回 "张三",类型 string
//   pluck({ name: "张三", age: 18 }, "age")  → 返回 18,类型 number
//   pluck({ name: "张三" }, "age")            → 编译报错(对象里没有 age 这个键)
// 规则:
//   ① 签名用两个类型参数 <T, K extends keyof T>
//   ② 返回类型写 T[K](T 的 K 键对应的类型)
//   ③ 不许用 any
// 卡点提示:
//   · keyof T 意为"T 的所有键组成的联合"——第 15 课才正式学,这里先用起来
//   · K extends keyof T 意为"K 必须是 T 的一个键",传不存在的键就会编译报错
//   · body 就一行:return obj[key],返回类型 TS 会自动推导,签名直接写 T[K]
//   · 写完运行 check:第三行(传不存在的键)应报错——这就是约束在起作用
// ============================================================

// 你的 pluck(自己设计参数和返回类型):
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  // 你的实现
  return obj[key]
}
const name1 = pluck({ name: "张三", age: 18 }, "name")   // 期望类型 string
const age  = pluck({ name: "张三", age: 18 }, "age")     // 期望类型 number
// const bad  = pluck({ name: "张三" }, "age")               // 期望编译报错
// 类型“"age"”的参数不能赋给类型“"name"”的参数

// ============================================================
// 任务 4(自测铺垫,写注释):泛型 vs any
// 参考下方两个函数,用注释回答:
//   a) identityAny(42) 的返回值类型是什么?调用方拿它做算术,需要额外做什么?
//   b) identity(42) 的返回值类型是什么?调用方还需要再收窄吗?
//   c) 用一句话概括:泛型与 any 的本质区别?
// ============================================================
function identityAny(x: any): any {
  return x
}
const any1 = identityAny(42)
const any2 = identity(42)
// identityAny(42) 的返回值类型是 any 需要类型收窄
// identity(42) 的返回值类型是42 不需要收窄
// 本质区别是 泛型调用时确定 有约束关系   any是任意类型 完全跳过了ts