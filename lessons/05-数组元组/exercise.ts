/**
 * 第 5 课练习:数组与元组
 *
 * 运行方式:
 *   npx tsx lessons/05-数组元组/exercise.ts   # 运行本文件
 *   npm run check                             # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   T[]                      → 元素为 T 的数组
 *   Array<T>                 → 和 T[] 等价(泛型写法,先混脸熟,第 12 课正式学)
 *   readonly T[]             → 只读数组,不能 push/splice(和第 4 课 readonly 属性呼应)
 *   [number, number]         → 元组:固定长度、每位置类型独立
 *   [string, number?]        → 可选元组元素(只能放末尾)
 *   arr[0] 的类型            → 本仓库开了 noUncheckedIndexedAccess,是 T | undefined
 *
 * 任务 1:三种数组写法。
 *   a) tags: string[]          → 装几个字符串标签
 *   b) scores: Array<number>   → 装几个分数
 *   c) readonlyTags: readonly string[] → 装标签,但声明只读
 *   然后:对 readonlyTags 调用 push('x') → npm run check 看报错,再注释掉
 *   思考(写注释):readonlyTags 和 a) 的 tags 差别在哪?
 *
 * 任务 2:坐标元组。
 *   type Point = [number, number] 表示平面坐标 (x, y)。
 *   创建点 (3, 4),分别 console.log 出 x 和 y。
 *   然后试读 point[2](越界)→ npm run check 看报错,再注释掉
 *
 * 任务 3:CSV 行元组。
 *   CSV 每行是"姓名,年龄,是否会员",用元组表示:
 *   type CsvRow = [string, number, boolean]
 *   创建一行 ['小明', 25, true],打印整行。
 *   再把 CsvRow 改成命名元组:
 *   type CsvRow2 = [name: string, age: number, isVip: boolean]
 *   观察:赋值/读取代码是否还一样?命名元组给了你什么?(写注释)
 *
 * 任务 4:安全读取数组元素。
 *   本仓库开了 noUncheckedIndexedAccess,所以 arr[0] 的类型不是 string 而是 string | undefined。
 *   a) 定义 const names: string[] = ['张','李'];写 const firstEl = names[0]
 *      注释写出 firstEl 的类型是什么
 *   b) 写一个函数 first(names: string[]): string | undefined,
 *      返回第一个元素;数组为空时返回 undefined。
 *      (提示:空数组用 names.length === 0 判断;这里你可能会想用泛型,
 *       别急,第 12 课正式学,现在用 string 类型就行)
 */

// ===== 任务 1:三种数组写法 =====
const tags: string[] = ['A', 'B', 'C']
const scores: Array<number> = [85, 90, 78]
const readonlyTags: readonly string[] = ['A', 'B', 'C']
// readonlyTags.push('x')
// Property 'push' does not exist on type 'readonly string[]'
// 思考:readonlyTags 和 tags 差别在哪?__readonlyTags是只读的，不能操作__

// ===== 任务 2:坐标元组 =====
type Point = [number, number]
const point: Point = [114.123, 30.456]
console.log(point[0], point[1])
// console.log(point[2])
// Tuple type 'Point' of length '2' has no element at index '2'

// ===== 任务 3:CSV 行元组 =====
type CsvRow = [string, number, boolean]
const row: CsvRow = ['小明', 25, true]
console.log(row)

type CsvRow2 = [name: string, age: number, isVip: boolean]
const row2: CsvRow2 = ['小明', 25, true]
// 思考:命名元组给了你什么?__提示了含义__

// ===== 任务 4:安全读取数组元素 =====
const names: string[] = ['张', '李']
const firstEl = names[0]
//    firstEl 的类型是:__string | undefined__

function first(names: string[]): string | undefined {
  // 你的实现
  if(names.length === 0) {
    return undefined
  } else {
    return names[0]
  }
}