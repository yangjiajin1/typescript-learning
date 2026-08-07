/**
 * 第 2 课练习:类型推断
 *
 * 运行方式:
 *   npx tsx lessons/02-类型推断/exercise.ts   # 运行本文件
 *   npm run check                             # 全量类型检查(看报错用这个)
 *
 * 任务 1:预判推断。对下面每段代码,在"我的预判"里写出你猜的推断类型。
 *   填完预判后验证:
 *   有编辑器 → 把鼠标悬停到变量名上,看编辑器显示的类型
 *   没编辑器 → 把预判发给 Claude,Claude 用 tsc 帮你对照
 *
 * 任务 2:函数参数为什么必须注解?取消注释下面的 double 函数,
 *   运行 npm run check 看报错,抄写报错并解释原因,再注释回去。
 */

// --- 任务 1:预判推断 ---

// 1. let 变量,用字符串初始化
let a = "hello"
// 我的预判:__string__

// 2. const 变量,用字符串初始化(和上面 let 有区别吗?)
const b = "hello"
// 我的预判:__hello__

// 3. number 初始化
let c = 42
// 我的预判:__number__

// 4. 对象字面量:TS 会推断成什么样的类型?
const user = { name: "张三", age: 30 }
// 我的预判:__{ name: string; age: number }__

// 5. 数组
const nums = [1, 2, 3]
// 我的预判:__number[]__

// 6. 空数组:TS 怎么猜?它够确定吗?
const empty = []
// 我的预判:__any[]__

// 7. 函数返回值:TS 能猜出返回类型吗?
function total(price: number, count: number) {
  return price * count
}
// 我的预判:__number__

// 8. 分支返回值:两个分支返回不同类型,会推断成什么?
function pick(x: boolean) {
  if (x) {
    return "yes"
  } else {
    return 42
  }
}
// 我的预判:__number | string__

// --- 任务 2:函数参数为什么必须注解? ---
// 取消注释下面这段,运行 npm run check,抄写报错:
// 报错:__Parameter 'n' implicitly has an 'any' type__
// 为什么?(提示:对比上面 total 函数——参数 price/count 有注解才能推断;而这里的 n 呢?)
// 因为没有注解 可能会传入任何类型导致内部报错 

// function double(n) {
//   return n * 2
// }
