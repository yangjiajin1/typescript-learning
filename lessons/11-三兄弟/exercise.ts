/**
 * 第 11 课练习:any / unknown / never 三兄弟
 *
 * 运行方式:
 *   npx tsx lessons/11-三兄弟/exercise.ts   # 运行本文件
 *   npm run check                          # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   any     → 退出键。TS 不检查了,类型错误全留到运行时炸
 *   unknown → 安全版 any。能收进任何值,但用之前必须收窄
 *   never   → 空集。不可能出现的值,函数底部 / 穷尽检查用
 *
 * 决策口诀:
 *   不知道类型但必须处理 → unknown + 收窄(安全)
 *   永远不该出现的分支   → never(穷尽)
 *   any 什么时候用?→ 几乎不该用。真出现了,说明设计有洞
 *
 * 三个核心动作(记住它们):
 *   · 把 any 当"收到的东西" → 标注成 unknown
 *   · 要使用 unknown         → 先收窄(typeof / in / 自定义守卫,第 9 课技能)
 *   · 要写"不可能"的函数     → 返回类型 never
 */

// ============================================================
// 任务 1:读代码,预测 any 会怎么害人(先读后写)
// 下面 5 段代码,每一段都有一处 any。
// 每段:① 在注释里标出 any 在哪一行、TS 因为 any 放弃了什么检查
//       ② 预测"如果运行时数据不是想象中的样子,哪里会炸"
//       ③ 运行 npx tsx 看是否炸、炸在哪(有的会炸,有的类型错被吞掉)
// 先全部预测完,再运行验证。
// ============================================================

// ---- 场景 1:JSON.parse 的结果 ----
// JSON.parse 是内置函数,它的返回类型是 any(因为 TS 没法知道字符串里是啥)。
// 这就是"内置函数给了你 any"的典型:责任落到调用方头上。
function parseUser(json: string): any {
  return JSON.parse(json)
}
const parsedUser = parseUser('{"name": "张三", "age": 18}')
// 预测:下面这行,TS 会不会报错?运行时会不会炸?
// console.log(parsedUser.name.toUpperCase())
// 你的预测(注释里写): ts不会报错 JSON.parse(json)返回any类型 运行时不确定 字母应该是没问题 中文应该会报错
// ---- 场景 2:把 any 传给具体类型 ----
// age 本是字符串 "18",但 any 不在乎——它想变成 number 就变成 number。
// 这就是 any 的"双向传染":既能接收任何值,也能冒充任何值。
const userInput: any = { age: "18", name: 12345 }
const ageNum: number = userInput.age
// 预测:ageNum 运行时真的是 number 吗?如果拿它做 ageNum + 1 会得到什么?
// 你的预测: 不是number变成了 srting  会得到"181" 不是19

// ---- 场景 3:any 传进函数,参数保护失效 ----
function double(x: any): any {
  return x * 2
}
const doubled: string = double("abc")
// 预测:double("abc") 返回什么?TS 为什么会允许它赋给 string?
// 你的预测: 返回 NaN   因为 x 是 any 类型

// ---- 场景 4:async 函数把 any 一路带出去 ----
// fetch 的 res.json() 返回 Promise<any>,这个 any 会顺着函数签名漏出去。
// 调用方 user.name 再也不被检查——问题从源头传染到了每一处使用点。
async function fetchUser(id: number): Promise<any> {
  const res = await fetch(`/api/user/${id}`)
  return res.json()
}
// 预测:如果后端返回的不是 { name: string },调用方会怎样?TS 会提前发现吗?
// 你的预测: 调用不会报错 运行时报错

// ---- 场景 5:any 对象访问不存在的属性 ----
const config: any = { database: { host: "localhost", port: 5432 } }
// 预测:下面这行会炸吗?TS 会提前发现 config.database.password 不存在吗?
// console.log(config.database.password.toUpperCase())
// 你的预测: ts 无法提前发现  只有运行时才能发现

// ============================================================
// 任务 2:改写 5 处 any → unknown + 收窄(本课核心,你写)
// 规则:
//   ① 把每一处的 any 改成 unknown(或更具体的联合/结构类型,看场景)
//   ② unknown 不能直接用——先用第 9 课的收窄技能(typeof / 自定义守卫)
//   ③ 收窄好之后,访问属性/使用值都不许再出现 any
//   ④ 全部改完,npm run check 要全绿,并且运行正常
// 卡点提示:
//   · unknown 上不能访问 .name/.age —— 报错会提示"Object is of type 'unknown'"
//   · 对象类型收窄用 in / typeof 判断后再取值,或写自定义类型守卫
//   · 场景 2 的收窄:typeof userInput.age === "number" 才当 number 用
//   · 场景 5 的收窄:先确认 config 是对象、database 是对象,再取值
// ============================================================

// (改写就从这里开始,直接在下方改)
function parseUserGaiXie(json: string): unknown {
  return JSON.parse(json)
}
const parsedUserGaiXie = parseUserGaiXie('{"name": "张三", "age": 18}')
if (typeof parsedUserGaiXie === "object" && parsedUserGaiXie !== null && 'name' in parsedUserGaiXie && typeof parsedUserGaiXie.name === "string") {
  console.log(parsedUserGaiXie.name.toUpperCase())
}

const userInputGaiXie: unknown = { age: "18", name: 12345 }
if (typeof userInputGaiXie === "object" && userInputGaiXie !== null && 'age' in userInputGaiXie && typeof userInputGaiXie.age === "number") {
  const ageNumGaiXie: number = userInputGaiXie.age
  console.log(ageNumGaiXie + 1)
}

function doubleGaiXie(x: unknown): number {
  if (typeof x !== "number") {
    return 0
  }
  return x * 2
}
const doubledGaiXie: number = doubleGaiXie("abc")


async function fetchUserGaiXie(id: number): Promise<unknown> {
  const res = await fetch(`/api/user/${id}`)
  return res.json()
}
const configGaiXie: unknown = { database: { host: "localhost", port: 5432 } }
// 预测:下面这行会炸吗?TS 会提前发现 config.database.password 不存在吗?
if (typeof configGaiXie === "object" && configGaiXie !== null && 'database' in configGaiXie && typeof configGaiXie.database === "object" && configGaiXie.database !== null && 'password' in configGaiXie.database) {
  // console.log(configGaiXie.database.password.toUpperCase()) // “configGaiXie.database.password”的类型为“未知”
}

// ============================================================
// 任务 3:为什么 never 出现在函数底部?
// 下面的 fail 和 assertNever 返回类型都是 never。运行后观察:
//   ① 执行 fail() 会发生什么?fail 的调用点之后的代码还会执行吗? 
// 回答 不执行
//   ② 把 fail 的返回类型从 never 改成 void,跑 check —— 调用点后的代码
//  回答 check 后无报错 
//      TS 还认为"执行不到"吗?这解释了"never = 可以提前结束的类型"。
//   ③ assertNever 出现在第 10 课 switch 的 default 分支里,作用是?
// 回答 用于穷尽检查,如果有未处理的分支,会在编译时报错,提示开发者处理遗漏的情况
// ============================================================
function fail(msg: string): never {
  throw new Error(msg)
  // console.log("fail之后的代码") // 这行永远不会执行到
  // Unreachable code detected
}
fail("boom")
// console.log("after fail")
// Unreachable code detected
function assertNever2(x: never): never {
  throw new Error("Unexpected object: " + x)
}

// ============================================================
// 任务 4(自测铺垫,写注释):三兄弟决策小测
// 下列场景各该用 any / unknown / never 中的哪个?为什么?
//   a) 函数 parse(data: string),把 JSON.parse 的结果交给调用方,调用方自己收窄
//  用 unknown
//   b) 一段绝不可能执行到的分支(比如穷尽检查的 default)
//  用 never
//   c) 一个报错就跑路、从不正常返回的函数
//  用 never
//   d) 一个接受"用户输入的任意值"的函数参数
//  用 unknown 
//   e) 上面这些场景,有没有哪个真的非 any 不可?
// 没有
// ============================================================


