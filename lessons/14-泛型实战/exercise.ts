/**
 * 第 14 课练习:泛型实战 + 阶段复盘
 *
 * 运行方式:
 *   npx tsx lessons/14-泛型实战/exercise.ts   # 运行本文件
 *   npm run check                          # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   Result 模式  → 成功/失败两种结果的"可辨识联合",一个类型把两种可能说清楚
 *   判别字段     → ok: true / ok: false,靠它窄化(第 10 课能力)
 *   泛型函数     → function request<T>(...): Promise<Result<T, string>>(第 12/13 课能力)
 *   窄化         → 判断 res.ok 后,TS 自动缩到对应分支(第 9 课能力)
 *
 * 核心思维(务必先读懂再动手):
 *   "请求函数"是工作中最常见的泛型场景:成功返回数据,失败返回错误。
 *   想表达"可能成功可能失败",两种典型写法:
 *     ① 直接返回 T,失败时 throw —— 调用方必须自己 try/catch,忘了就崩
 *     ② 返回 Result<T, E>,失败不 throw —— 调用方被迫检查 ok,TS 全程盯着
 *   方案 ② 就是本课的 Result 模式:
 *     type Result<T, E> =
 *       | { ok: true;  value: T }   // 成功:手里有数据 value
 *       | { ok: false; error: E }   // 失败:手里有错误 error
 *   注意 ok 是字面量类型 true | false——这就是第 10 课的可辨识联合。
 *   把"联合 + 泛型 + 窄化"三课能力缝在一起,就是第 14 课"泛型实战"的意义。
 *   (第 24 课做 axios 封装时会再次见到这个模式。)
 */

// ============================================================
// 任务 1:读代码,预测类型(先读后写)
// Result 已定义好。每一问先在注释里写预测,再运行验证。
// 验证:悬停变量看类型。
// ============================================================
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

// ① 预测:ok1 的类型是?(悬停看)
// 你的预测:{ ok: true; value: number;}
const ok1: Result<number, string> = { ok: true, value: 42 }

// ② 预测:err1 的类型是?
// 你的预测:{ ok: false; value: string;}
const err1: Result<number, string> = { ok: false, error: '404' }

// ③ 判断:下面两行各报不报错?为什么?(先想,再取消注释用 check 验证)
// const bad1: Result<number, string> = { ok: true, value: "hi" }   // ① 会报错吗?  会报错 定义T为number 赋值 ok true 对应值应该也是number
// 不能将类型“string”分配给类型“number”
// const bad2: Result<number, string> = { ok: false, value: 42 }    // ② 会报错吗?  会报错 同样问题 定义 E为string  赋值 ok false 应该对应 srting
// 对象字面量只能指定已知属性，并且“value”不在类型“{ ok: false; error: string; }”中

// ④ 预测窄化:handle 里每个位置 res 被缩成什么类型?
function handle(res: Result<number, string>) {
  if (res.ok) {
    // ④a:这里 res 的类型是?能访问 res.error 吗?
    // 你的预测: { ok: true; value: number;}  不能访问 error
    res.value // 悬停看类型
  } else {
    // ④b:这里 res 的类型是?能访问 res.value 吗?
    // 你的预测: { ok: false; error: string; }  不能访问 res.value
    res.error // 悬停看类型
  }
}

// ============================================================
// 任务 2:写 Result<T, E> + request<T>(本课核心,你写)
// 目标:自己写一遍 Result 联合,再写一个 request 函数(不真发请求)。
// 使用方式:
//   const data = await request<{ id: number }[]>("/api/users", [{ id: 1 }])
//   if (data.ok) { /* data.value: { id: number }[] */ } else { /* data.error: string */ }
// 规则:
//   ① 不许用 any
//   ② Result 用可辨识联合,ok 必须是字面量 true | false(第 10 课判别字段)
//   ③ request 签名要同时出现 T,失败分支的错误类型定死为 string
// 卡点提示(先自己写,卡住再看):
//   · Result<T, E> 两个类型参数:T 是成功数据的类型,E 是错误信息的类型
//   · request<T>(url: string, mock: T): Promise<Result<T, string>>
//     —— 成功分支 value 用 mock(类型恰好是 T),失败分支 error 用 "请求失败"
//   · body 里用 Math.random() < 0.5 模拟成败,成功返回 { ok: true, value: mock }
//   · 为什么错误类型不写成 any,而是写成联合?→ 先自己体会,自测题会考你
// ============================================================

// ① 你的 Result(自己写,与任务 1 重名的话可改名):
type MyResult<T, E> = { ok: true; value: T } | { ok: false; error: E }
// ② 你的 request(自己写签名和 body):
async function request<T>(url: string, params: T): Promise<MyResult<T, string>> {
  // 你来写
  if (url === '/api/users') {
    return {
      ok: true,
      value: params,
    }
  } else {
    return {
      ok: false,
      error: '404',
    }
  }
}

async function getData() {
  // ③ 验证:写 if/else 消费 data,悬停确认类型
  const data = await request<{ id: number }[]>('/api/users', [{ id: 1 }, { id: 2 }])
  if (data.ok) {
    // data.value 期望是 { id: number }[]?你看到的是什么?
    console.log(data.value)
    //我看到的是 { id: number;}[]
  } else {
    // data.error 期望是 string?你看到的是什么?
    console.log(data.error)
    // 我看到的是 string
  }
}
getData()
// ============================================================
// 任务 3:阶段复盘——翻错题本(第 12/13 课相关)
// 打开 progress.md 的错题本,看泛型相关这几条:
//   · 2026-08-19 任务2:容器换成 new Map 后仍写方括号索引 cacheObj[key] = value
//   · 2026-08-19 任务3:indexBy 里写 per.set(key, item),把键名当成了键值
//   · 2026-08-19 any 记录:new Map() 被推断成 Map<any, any>
// 逐条在下面写"当时错在哪 + 现在怎么想"。
// 最后总结一句:泛型阶段(第 12-14 课)你印象最深的一条教训是什么?
// ============================================================
// 你的复盘:
// ① new Map 那题: 当时粗心了 而且没检查  new Map 使用和普通对象不一致  应该使用 set  get相关方法
// ② 键名 vs 键值那题: 
// ③ any 逃逸那条:
// ④ 泛型阶段最重要的教训:
