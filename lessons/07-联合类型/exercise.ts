/**
 * 第 7 课练习:联合类型——"或"的思维
 *
 * 运行方式:
 *   npx tsx lessons/07-联合类型/exercise.ts   # 运行本文件
 *   npm run check                             # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   A | B            → 联合类型:值要么是 A,要么是 B,TS 两者都接受
 *   赋值             → 联合类型的任何一个成员都能赋进去
 *   读取             → 只能访问"两者都有"的成员(TS 做最坏打算)
 *   typeof x === ... → 窄化预览:缩小范围后 TS 才批准独有成员(第 9 课正式学)
 *
 * 任务 1:声明一个联合类型。
 *   a) 写一个变量 userId,类型是 string | number,初始值给 "abc123"
 *   b) 再给它赋一个纯数字 42(还报错吗?)
 *   c) 写一个函数 formatId(id: string | number): string,里面 console.log(id),
 *      运行确认。函数体内目前还没用到任何独有方法——这正是联合类型安全的体现。
 *
 * 任务 2:体验"只能访问共有成员"(核心!这一步要报错)。
 *   给 userId 依次加这几行,每次 npm run check 看报错:
 *   a) userId.toUpperCase()   → 报错吗?报错信息抄下来,写注释
 *   b) userId.toFixed(2)      → 报错吗?同上
 *   c) userId.toString()      → 报错吗?为什么这个不报?
 *   d) 结论:联合类型只能访问 ____ 的成员
 *
 * 任务 3:数组元素联合。
 *   写一个数组 flags,里面同时装 string 和 number,类型注解写 (string | number)[],
 *   随便放几个元素(如 ['a', 1, 'b', 2])。
 *   a) flags[0] 的类型是什么?写注释预判
 *   b) 调用 flags[0].toUpperCase() → 报错吗?(想一想:noUncheckedIndexedAccess
 *      的坑会不会叠加?上一课学的)
 *   c) 怎样能让 flags[0] 安全地 toUpperCase?提示:窄化
 *
 * 任务 4:窄化预览——用 typeof 缩小范围。
 *   写函数 formatId 的完整实现:
 *   function formatId(id: string | number): string {
 *     // 如果 id 是 string,return 'ID-' + id
 *     // 如果 id 是 number,return 'ID-' + id.toFixed(2)
 *   }
 *   a) 写完观察:在 if (typeof id === 'string') 分支里,id.toUpperCase() 还报错吗?
 *   b) 试试在 else 分支里调 id.toUpperCase() → 报错吗?为什么?
 *   c) 用一个能同时处理 string 和 number 的表达式,把整个函数压成一行(可选加分题)
 *
 * 任务 5:什么时候会用到联合(思考题,写注释即可)。
 *   举 2 个你工作里(Vue 3 场景)可能用到 A | B 的例子。
 *   想不出来就写:下拉框选项值、函数参数"可能传 string 也可能传 number"的场景。
 */

// ===== 任务 1:声明一个联合类型 =====
// a) 你的代码:
let userId: string | number = "abc123"
// b) 再赋数字 42:
// userId = 42
//   还报错吗?_不报错_

// c) formatId 骨架:
// function formatId(id: string | number): string {
//   console.log(id)
//   return ''
// }

// ===== 任务 2:体验"只能访问共有成员" =====
// userId.toUpperCase()
// a) userId.toUpperCase() 报错信息:_类型“number”上不存在属性“toUpperCase”_
// userId.toFixed(2)
// b) userId.toFixed(2)    报错信息:_属性“toFixed”在类型“string”上不存在。如果刚赋值number就不报错_
userId.toString()
// c) userId.toString()    报错?_不报错_ 原因:_是共有方法_
// d) 结论:联合类型只能访问 __共有__ 的成员

// ===== 任务 3:数组元素联合 =====
// a) 预判 flags[0] 类型:_string | number_
// b) flags[0].toUpperCase() 报错?_报错_ 原因(提示:想一想 6 课的知识):_数组元素的联合类型只能调用共有方法_

// c) 让 flags[0] 安全 toUpperCase 的办法:_类型窄化，判断是 string 类型在调用_

// ===== 任务 4:窄化预览 =====
// function formatId(id: string | number): string {
//   if (typeof id === 'string') {
//     // return 'ID-' + id.toUpperCase();
//     return 'ID-' + id;
//   }
//   return 'ID-' + id.toFixed(2);
// }

// 验证(取消注释):
console.log(formatId('abc'))  // ID-abc
console.log(formatId(3.14159)) // ID-3.14

// a) 分支里 toUpperCase 还报错吗?_首先你要的结果是小写所以不需要使用toUpperCase，由于类型窄化使用也不会报错_
// b) else 分支里调 toUpperCase 报错吗?_会报错_ 原因:_类型已窄化为number_
// c) 一行版(可选):__
function formatId(id: string | number): string {
  return `ID-${typeof id === 'string' ? id : id.toFixed(2)}`
}
// ===== 任务 5:思考题 =====
// 你的两个例子:
// 1) 下拉框选项值
// 2) 函数参数"可能传 string 也可能传 number"
