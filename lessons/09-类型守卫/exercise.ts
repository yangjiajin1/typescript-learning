/**
 * 第 9 课练习:类型守卫与窄化(narrowing)
 *
 * 运行方式:
 *   npx tsx lessons/09-类型守卫/exercise.ts   # 运行本文件
 *   npm run check                             # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   窄化(narrowing) → 在"某个分支/作用域内"让联合类型变精确
 *   typeof    → 适合 string / number / boolean / symbol / bigint / undefined
 *   instanceof→ 适合判断类实例(如 Date、Array、自定义类)
 *   in        → 适合判断"对象有没有某个属性"(如 'meow' in animal)
 *   字面量判断 → if (x === "draft") / switch(x) 也能收窄
 *   陷阱      → typeof null === "object"(null 也会骗到你!)
 *
 * 记住一句话:联合类型默认只能调"共有成员";
 * 想访问"独有的"成员,必须先窄化到那个分支。
 */

// ===== 任务 1:typeof 守卫——把输入格式化成字符串 =====
// 需求:写一个函数 formatInput,接受 string | number | Date,返回字符串:
//   - string  → 原样返回
//   - number  → 返回 `数字: ${n}`
//   - Date    → 返回 `日期: ${d.toISOString()}`
// 卡点提示:如果直接写 d.toISOString(),TS 会报错——因为 Date 可能不存在。
//   先预判:直接访问分支独有方法,报错信息大概在说什么?(写注释)
//   然后:用 if (typeof input === "string") 分别收窄,最后处理 Date。
//   (提示:Date 用 typeof 判断是 "object",到那时它会和谁撞在一起?先写 string/number,Date 后面处理)

function formatInput(input: string | number | Date): string {
  if (typeof input === 'string') {
    return input
  }
  if (typeof input === 'number') {
    return `数字: ${input}`
  }
  if (input instanceof Date) {
    return `日期: ${input.toISOString()}`
  }
  throw new Error('不支持的输入类型')
}
// 最后 ts眼里 input 是 不存在的类型

// ===== 任务 2:陷阱验证——typeof null 是什么 =====
// 预判:typeof null 的值是 __object__(不要运行,先写注释里)
// 写一行代码验证(console.log 一下)。
console.log(typeof null) // 输出 "object"
// 思考:下面这个判断有没有问题?写注释说明理由。
//   if (typeof x === "object") {
//     // 我能安全地把它当对象用吗?
//   }
// 提示:typeof 返回 "object" 的,除了对象还有什么?这会造成什么后果?
// 不能，可能是null 或者 数组 或者 日期对象

// ===== 任务 3:instanceof 守卫——专门对付 Date =====
// 补全任务 1 的 Date 分支:
//   用 input instanceof Date 判断,收窄后调用 toISOString()。
// 写完再思考(注释):为什么 Date 不能用 typeof 判断?(typeof new Date() 返回什么?)
//   对比:Array 判断你见过几种写法?(typeof 能判断数组吗?)
console.log(typeof new Date()) // 输出 "object"
// Array 的判断方法 有 Array.isArray(arr) 和 arr instanceof Array  typeof不能判断数组
// ===== 任务 4:in 守卫——猫和狗 =====
// 定义联合类型:
//   type Cat = { kind: "cat"; meow(): void }
//   type Dog = { kind: "dog"; bark(): void }
//   type Animal = Cat | Dog
// 写函数 makeSound(a: Animal): string:
//   - 猫 → 返回 "喵"
//   - 狗 → 返回 "汪"
// 两种写法任选或都试:
//   a) 用 in 判断:'meow' in a
//   b) 用判别字段判断:a.kind === "cat"(提示:这其实也是收窄——字面量判断)
// 卡点提示:如果不窄化,直接 a.meow() 会报错——为什么?(写注释)
type Cat = { kind: 'cat'; meow(): void }
type Dog = { kind: 'dog'; bark(): void }
type Animal = Cat | Dog
// function makeSound(a: Animal): string {
//   if ('meow' in a) {
//     return '喵'
//   } else {
//     return '汪'
//   }
// }
function makeSound(a: Animal): string {
  if (a.kind === 'cat') {
    return '喵'
  } else {
    return '汪'
  }
}
// 如果不窄化 ts任务两种类型是都有可能传入 如果传入猫 调用 bark 必然报错 需要窄化
// 等价 第二种更可读 平常主要用这种 可以一眼看出类型 而不是可用的方法

// ===== 任务 5:字面量判断——状态机雏形 =====
// 定义 type OrderStatus = "待支付" | "已支付" | "已取消"
// 写函数 statusLabel(s: OrderStatus): string,返回每个状态的中文描述:
//   - 待支付 → "订单未付款"
//   - 已支付 → "订单已付款"
//   - 已取消 → "订单已取消"
// 用 if (s === "待支付") 连续收窄,或者用 switch。
// 收窄之后的 s 在每个分支里是什么类型?写注释说明。
// (这其实是第 10 课"可辨识联合"的前菜,今天先感受 switch 收窄的威力)
type OrderStatus2 = '待支付' | '已支付' | '已取消'

function statusLabel(s: OrderStatus2): string {
  switch (s) {
    case '待支付': // s 在这个分支里是 "待支付" 类型
      return '订单未付款'
    case '已支付': // s 在这个分支里是 "已支付" 类型
      return '订单已付款'
    case '已取消': // s 在这个分支里是 "已取消" 类型
      return '订单已取消'
  }
}
// 删除已取消会报错  函数缺少结束 return 语句，返回类型不包括 "undefined"。

console.log(formatInput('你好'))
console.log(formatInput(42))
console.log(formatInput(new Date()))
console.log(makeSound({ kind: 'cat', meow() {} }))
console.log(statusLabel('已支付'))
