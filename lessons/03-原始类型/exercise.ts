/**
 * 第 3 课练习:原始类型与字面量类型
 *
 * 运行方式:
 *   npx tsx lessons/03-原始类型/exercise.ts   # 运行本文件
 *   npm run check                             # 全量类型检查(看报错用这个)
 *
 * 任务 1:字面量类型。类型注解除了 string/number 这种"宽类型",还可以写具体值:
 *   let s: "draft" = "draft"        // s 只能是 "draft" 这一个值
 *   type OrderStatus = "pending" | "paid" | "shipped"   // "几个可选值之一"
 * 请你自己定义一个 OrderStatus 类型(三个状态),再写两行赋值演示:
 *   一行是合法赋值,一行是故意赋一个不存在的状态(观察 npm run check 报错后注释掉)。
 * type OrderStatus = "start" | "pause" | "finish"
 * let order1: OrderStatus = "start"
 * order1 = "pause"
 * order1 = 'over'
 *
 * 任务 2:预判——let 和 const 的推断差异(先写预判,再悬停验证)
 *   let x = "a"     → 推断:__string__
 *   const y = "a"   → 推断:__a__
 *   为什么有差异?(提示:let 可以重新赋值,const 不能)
 *   因为const不能赋值 永远不会变 可以无限收紧为 a
 *
 * 任务 3:as const 冻结对象。
 *   下面的 config 目前推断成 { theme: string; size: string }。
 *   在对象后面加上 as const,运行/悬停观察推断变成什么。
 * const config = { theme: "dark", size: "large" } as const
 *   → 加 as const 后推断:__{ theme: "dark", size: "large" }__
 *   解释:as const 到底"冻结"了什么?对使用方有什么好处?
 *   冻结config下所有属性 使其不可修改 当使用方不想更改比如常量时 可以使用
 *
 * 任务 4:原始类型全家桶速认。每个变量各是什么原始类型?填在注释里。
 *   const isDone = false          → __boolean__
 *   const big = 123n              → __bigint__
 *   const sym = Symbol("id")      → __symbol__
 *   const maybe = null            → __null__
 *   const undef = undefined       → __undefined__
 */

type OrderStatus = "start" | "pause" | "finish"
let order1: OrderStatus = "start"
order1 = "pause"
// order1 = 'over'
// Type '"over"' is not assignable to type 'OrderStatus'


const config = { theme: "dark", size: "large" } as const
// type const = {
//  readonly theme: "dark";
//  readonly size: "large";
// }