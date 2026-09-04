/**
 * 第 19 课练习:声明文件 .d.ts 与 @types 机制
 *
 * 运行方式:
 *   npm run check                          # 类型检查(本课主要看:先报 TS7016,写完 .d.ts 后变绿)
 *   npx tsx lessons/19-声明文件/main.ts    # 运行本文件(执行的是 string-utils.js 的真实 JS 实现)
 *
 * 本课关键词速查:
 *   .d.ts     → "类型说明书":只写类型、不写实现。TS 检查时读它,运行时(tsx/node)读的是真 JS,当它不存在
 *   同名成对  → 一个 JS 库的类型说明,放在「同名同目录」的 .d.ts 里(string-utils.js ↔ string-utils.d.ts)
 *   TS7016    → "Could not find a declaration file for module '...'" 找不到声明,模块被当成隐式 any
 *   @types/*  → DefinitelyTyped 社区维护的类型包;@types/lodash 管 lodash;装了 TS 自动就能找到
 *   declare   → "运行时一定存在,类型由我来担保,你别管实现"
 *
 * 核心思维(务必先懂再动手):
 *   前 18 课,你写的每个 .ts 都是"类型写在实现旁边"。但真实世界大量 JS 库没有类型信息,
 *   TS 对它们的态度是:没有类型说明书 → 拒绝相信,按隐式 any 报错(TS7016)。
 *   本课目标:亲手给一个只有 JS 的库补一份最小 .d.ts,体会"类型说明书"和"运行时实现"是两张皮。
 */

// ============================================================
// 任务 1:先读后写 —— 先看"没写声明时"会发生什么
// ============================================================
// ① 打开同目录的 string-utils.js 读一遍(现在它还没有 .d.ts 配套)。
//    先"脑内"给 5 个导出项各想一个类型,填在下面:
//    toUpper(s)            的签名是: (s: string) => string
//    pad(s, len, ch?)      的签名是: (s: string, len: number, ch?: string) => string
//    splitLines(s)         的签名是: (s: string) => string[]
//    version               的类型是: string
//    defaultOptions        的类型是: { trim: boolean; keepEmpty: boolean; }

// ② 保持下面这行 import 原样(先不要新建任何 .d.ts),
//    运行 npm run check,把报错抄下来,再翻译成大白话:
//    报错原文: lessons/19-声明文件/main.ts:37:67 - error TS7016: Could not find a declaration file for module './string-utils'. 'D:/claude_work/typescript-learning/lessons/19-声明文件/string-utils.js' implicitly has an 'any' type.37 import { toUpper, pad, splitLines, version, defaultOptions } from './string-utils'
//    大白话翻译: 找不到模块 './string-utils' 的声明文件。'D:/claude_work/typescript-learning/lessons/19-声明文件/string-utils.js' 隐式具有 'any' 类型。

import { toUpper, pad, splitLines, version, defaultOptions } from './string-utils'

// ============================================================
// 任务 2:给 JS 库写最小 .d.ts(本课核心,要求零 any)
// ============================================================
// 在 lessons/19-声明文件/ 下新建 string-utils.d.ts(必须和 .js 同名同目录)。
// 用 export 把 5 个导出项的类型声明出来,写完 check 应全绿。
// 提示:这是"外部模块声明"(带顶层 export),先只写这一种;global 那种以后再说。
// 卡住别硬写,回头找我把关一下再继续。

// ============================================================
// 任务 3:消费验证 —— 让类型保护真正咬人
// ============================================================
// .d.ts 写好、check 全绿后,依次做下面动作,【每步先猜会不会报错】再 npm run check:
// ① 临时把下面的正确调用改成 toUpper(42) —— 猜:会报错吗?报什么? 类型“number”的参数不能赋给类型“string”的参数
// ② pad 只传两个参数(如 pad('x', 3))—— ch 本来是可选参数,猜:报错吗? 不报 
// ③ 读 defaultOptions.trim 和 version —— hover 看它们被推断成了什么类型? boolean 和 string
// ④ 把试探用的错误代码改回正确调用,再运行本文件看真实输出:

// console.log(toUpper(42)) // 类型“number”的参数不能赋给类型“string”的参数
console.log(pad('42', 5))
console.log(splitLines('a\nb\r\nc'))
console.log(version, defaultOptions.trim)

// ============================================================
// 挑战题(选做,做完不亏):
// 回到顶部 import 行,给这个库补上第 6 个导出 escapeHtml —— 但先别改 .js,
// 只在 string-utils.d.ts 里声明:  export function escapeHtml(s: string): string
// 然后在下面调用它并运行本文件。先想:check 会不会报错?运行会不会报错?
// 哪一个先"说真话"?这说明了声明文件的什么约束?
// ============================================================
// escapeHtml('<p>Hello, world!</p>') // check 不报错,运行也不报错,说明 .d.ts 约束了 TS 检查,但运行时 JS 里没有这个函数,所以运行时会报错