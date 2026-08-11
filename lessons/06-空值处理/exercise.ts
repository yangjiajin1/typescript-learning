/**
 * 第 6 课练习:null/undefined 与严格空检查
 *
 * 运行方式:
 *   npx tsx lessons/06-空值处理/exercise.ts   # 运行本文件
 *   npm run check                             # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   string | null        → 类型里显式声明"可能为空",strictNullChecks 下空值必须写明
 *   a?.b                 → 可选链:a 为 null/undefined 就不访问 .b,整个结果是 undefined
 *   a ?? b               → 空值合并:a 是 null 或 undefined 时用 b(注意:不是"假值"!)
 *   a || b               → 只要 a 是假值(0/''/false/null/undefined)就用 b
 *   a!                   → 非空断言:告诉 TS"这里绝不可能是空"(绕过检查,慎用!)
 *
 * 任务 1:体会 strictNullChecks。
 *   本仓库开了 strictNullChecks(true)。
 *   a) 写 const name1: string = null → npm run check 看报错,再注释掉
 *      报错在说"null 装不进 string"——这就是严格空检查:必须显式写 string | null
 *   b) 改成 const name2: string | null = null → 还报错吗?
 *   c) 把 name2 传给一个参数是 string 的函数 → 看报错
 *      (函数可以简单写 function eat(s: string) { console.log(s) })
 *      报错说明了什么?写注释
 *
 * 任务 2:可选链 ?. 改写嵌套访问。
 *   下面这段"层层检查"的代码:
 *   const user = { profile: { bio: '你好' } }
 *   if (user && user.profile && user.profile.bio) {
 *     console.log(user.profile.bio)
 *   }
 *   a) 用可选链改写上面的 if 判断(一行搞定)
 *   b) 改写后,如果 user.profile.bio 不存在,console.log 会打印什么?
 *      (提示:?. 短路,整个表达式结果是____)
 *
 * 任务 3:?? 与 || 的区别。
 *   运行下面这行,把结果写在注释里:
 *   console.log(0 ?? 10, 0 || 10, '' ?? 'x', '' || 'x', false ?? true, false || true)
 *   a) 打印结果:____
 *   b) 结论:?? 只在左边是 ____ 时才用右边;|| 只要左边是 ____ 就用右边
 *
 * 任务 4:处理"可能为 null 的用户输入"。
 *   场景:一个输入框 DOM 元素,inputEl 可能不存在(document.getElementById 找不到会返回 null),
 *   找到了也可能没输入内容(value === '')。
 *   写一个函数 getUsername(inputEl: HTMLInputElement | null): string,
 *   要求:
 *     - inputEl 不存在 → 返回 '匿名用户'
 *     - inputEl.value 是空字符串 → 也返回 '匿名用户'
 *     - 否则返回 inputEl.value 本身
 *   提示:可以用 ?. + ??(想一想:value 是 '' 时 ?? 会不会兜底?要不要配合 ||?),
 *   也可以先判断再 return。写完想一个方案即可,注释里说说你的取舍。
 *
 * 任务 5:体会 ! 非空断言(思考题,不用运行)。
 *   如果任务 4 里你这么写:
 *   function getUsername2(inputEl: HTMLInputElement | null): string {
 *     return inputEl!.value || '匿名用户'
 *   }
 *   a) 这里 ! 在骗谁?运行时如果 inputEl 真的是 null,会发生什么?
 *   b) 你的任务 4 写法是不是已经不需要 ! 了?为什么?
 *   写注释回答。
 */

// ===== 任务 1:体会 strictNullChecks =====
// const name1: string = null
// 不能将类型“null”分配给类型“string”

const name2: string | null = null
//    还报错吗?__不报错__

function eat(s: string) { console.log(s) }
  //  eat(name2)
//    报错说明:__类型“null”的参数不能赋给类型“string”的参数__

// ===== 任务 2:可选链 ?. =====
// const user = { profile: { bio: '你好' } }
// if (user && user.profile && user.profile.bio) {
//   console.log(user.profile.bio)
// }
// a) 改写:__user?.profile?.bio__
// b) 如果 bio 不存在,console.log 打印:__undefined__

// ===== 任务 3:?? 与 || =====
// console.log(0 ?? 10, 0 || 10, '' ?? 'x', '' || 'x', false ?? true, false || true)
// a) 打印结果:__0,10,'','x',false,true__
// b) 结论:?? 只在左边是 null 或 undefined 时才用右边;|| 只要左边是假值就用右边

// ===== 任务 4:处理可能为 null 的用户输入 =====
function getUsername(inputEl: HTMLInputElement | null): string {
  // 你的实现
  if (inputEl === null || inputEl.value === '') {
    return '匿名用户'
  }
  return inputEl.value
}

// 可以这样验证(取消注释):
console.log(getUsername(null))            // 匿名用户
console.log(getUsername({ value: '' } as HTMLInputElement))  // 匿名用户
console.log(getUsername({ value: '小明' } as HTMLInputElement)) // 小明

// ===== 任务 5:体会 ! 非空断言 =====
// a) __在骗类型检查，如果真是null 会崩溃__
// b) __不需要了，因为已经通过类型检查确保了 inputEl 不是 null__