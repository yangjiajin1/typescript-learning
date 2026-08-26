/**
 * 第 13 课练习:泛型进阶——接口、多参数、默认值
 *
 * 运行方式:
 *   npx tsx lessons/13-泛型进阶/exercise.ts   # 运行本文件
 *   npm run check                          # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   泛型接口      → interface Box<T>,定义处 T 是占位符,使用时 Box<number> 才确定
 *   多类型参数    → <K, V>,多个占位符各管各的,键/值是两种类型时用
 *   约束级联      → <K extends string, V extends ...> 每个参数各带各的约束
 *   默认类型参数  → <T = Default>,调用方不写时用默认值兜底
 *
 * 核心思维(务必先读懂再动手):
 *   interface Box<T> { value: T }
 *     Box<number>  → { value: number }
 *     Box<string>  → { value: string }
 *   读法:T 和函数参数一个道理——定义处是占位符,使用处填入具体类型。
 *   Box 是"类型模板",Box<number> 才是具体类型。函数泛型是"函数模板",泛型接口是"类型模板"。
 *
 *   多参数:
 *   interface Pair<K, V> { key: K; value: V }
 *     Pair<string, number> → { key: string; value: number }
 *   每个参数独立,也可以各自带约束,这叫约束级联:
 *     interface Dict<K extends string, V extends { id: number }> { ... }
 *
 *   默认参数:
 *   interface Box<T = string> { value: T }
 *     Box         → { value: string }   (没写 → 用默认)
 *     Box<number> → { value: number }   (写了 → 覆盖默认)
 *   应用场景:绝大多数调用方都用同一个类型时,写默认值让调用方少写一点。
 */

// ============================================================
// 任务 1:读代码,预测类型(先读后写)
// 下面三个 interface 已完整定义。每一问先在注释里写你的预测,
// 全部预测完再运行 npx tsx 看输出、npm run check 验证类型。
// 验证方法:把鼠标悬停在 const 变量名上,看 TS 推断出的类型。
// ============================================================
interface Box<T> {
  value: T
}

interface Pair<K, V> {
  key: K
  value: V
}

interface DefaultBox<T = string> {
  value: T
}

// ① 预测:box1 的类型是?(悬停 box1 看)
// 你的预测:Box<number>
const box1: Box<number> = { value: 42 }

// ② 预测:box2 的类型是?(悬停 box2 看)
// 你的预测:Box<string>
const box2: Box<string> = { value: "hi" }

// ③ 预测:pair1 的类型是?(悬停 pair1 看)
// 你的预测:Pair<string, number>
const pair1: Pair<string, number> = { key: "age", value: 18 }

// ④ 预测:db1 的类型是?(没写 <...> 会怎样?)
// 你的预测:DefaultBox<string>  没写走默认值
const db1: DefaultBox = { value: "hello" }

// ⑤ 预测:db2 的类型是?(写了 <number> 会怎样?)
// 你的预测:DefaultBox<number>  写了按写的来
const db2: DefaultBox<number> = { value: 99 }

// ⑥ 判断:下面两行,哪一行会报错?为什么?
// 你的预测: 都会报错吧   1默认是srting赋值number  2定义bumber赋值 srting
// const bad1: DefaultBox = { value: 123 }     // ① 不能将类型“number”分配给类型“string”。
// const bad2: DefaultBox<number> = { value: "no" }  // ② 不能将类型“string”分配给类型“number”

// ============================================================
// 任务 2:实现泛型缓存 Cache<K, V>(本课核心,你写)
// 目标:写一个泛型接口 Cache<K, V>,再加一个工厂函数 createCache<K, V>()
//   它像一个小型 Map,用来按 key 存/取 value。使用方式:
//   const c = createCache<string, number>()
//   c.set("age", 18)
//   c.get("age")   // 18(number)
//   c.get("nope")  // undefined(没存过)
// 规则:
//   ① 不许用 any
//   ② K 是键的类型,V 是值的类型,签名里必须同时出现
//   ③ get 没命中的情况要处理(想想第 6 课,可能返回什么)
// 卡点提示:
//   · 接口形状:Cache<K, V> 有 set(key: K, value: V): void 和 get(key: K): 返回类型?
//   · get 的返回类型:查不到会返回 undefined,所以返回类型不是纯 V(第 6 课教训,别漏!)
//   · 工厂函数 createCache<K, V>(): Cache<K, V> 返回一个新对象
//   · body 里存数据用一个真实的 Map<K, V>(JS 自带的,它的泛型参数正好是 Map<K, V>)
//   · 写完悬停 c.get("age") 看类型对不对
// ============================================================

// 你的 Cache 接口(自己设计):
interface CacheType<K, V> {
  set(key: K, value: V): void
  get(key: K): V | undefined
}

// 你的 createCache(自己设计):
function createCache<K, V>(): CacheType<K, V> {
  const cacheObj = new Map<K, V>()
  // 你的实现
  return {
    set(key, value) {
      cacheObj.set(key, value)
    },
    get(key) {
      return cacheObj.get(key)
    },
  }
}

const ccc = createCache<string, number>()
ccc.set("age", 18)
const got = ccc.get("age")     // 悬停看类型,期望 number | undefined
const miss = ccc.get("nope")   // 期望 undefined

// ============================================================
// 任务 3:泛型键值对工具(约束级联,进阶,你写)
// 目标:写 indexBy<T, K extends keyof T>(items, key)
//   把对象数组按某个键的值组织成一个"以键值分组"的 Map。
//   const users = [
//     { id: 1, name: "张三" },
//     { id: 2, name: "李四" },
//   ]
//   indexBy(users, "id") → Map<number, {id,name}> :1→张三, 2→李四
//   indexBy(users, "name") → Map<string, {id,name}>
//   注意:同一个键可能有多条数据,所以值用数组(T[])。
// 规则:
//   ① 不许用 any
//   ② 两个类型参数:T 是元素类型,K extends keyof T(沿用第 12 课的约束)
//   ③ 返回类型要表达出"键的类型 = T[K],值的类型 = T[]"
// 卡点提示:
//   · 签名:function indexBy<T, K extends keyof T>(items: T[], key: K): Map<T[K], T[]>
//   · body:新建 Map,for...of 遍历,items 里每项 t → 用 t[key] 做键,塞进对应数组
//   · t[key] 的类型是 T[K](第 12 课 pluck 已经用过一次)
//   · 塞进数组这步:先取 map.get(t[key]),存过就 push,没存过就新建 [t] 放进去
// ============================================================

// 你的 indexBy(自己设计签名和实现):
function indexBy<T, K extends keyof T>(arr: T[], key: K): Map<T[K], T[]> {
  // 你的实现
  return arr.reduce((per,item) => {
    const list = per.get(item[key])
    if (list) {
      list.push(item)
    } else {
      per.set(item[key], [item])
    }
    
    return per
  }, new Map<T[K], T[]>())
}

const users = [
  { id: 1, name: "张三" },
  { id: 2, name: "李四" },
  { id: 3, name: "张三" },
]
const byId   = indexBy(users, "id")    // 期望 Map<number, ...>
const byName = indexBy(users, "name")  // 期望 Map<string, ...>
// const bad   = indexBy(users, "age")   // 期望编译报错(users 没有 age 键)
// 类型“"age"”的参数不能赋给类型“"name" | "id"”的参数

// ============================================================
// 任务 4(自测铺垫,写注释):默认类型参数
// 参考 DefaultBox,用注释回答:
//   a) 什么样的接口适合给类型参数加默认值?
//   b) 默认值和泛型约束(extends)冲突吗?还是各管各的?
//   c) 现实场景:如果写一个分页请求的返回类型 Paginated<T = User>,T 默认 User 合理吗?为什么?
// ============================================================
// 你的回答:
// a) 多数情况都会用的类型，这样调用可以少些
// b) 不冲突，泛型约束管可以传什么类型，默认值管不写类型时用哪个  
// c) 虽说多数情况下返回User就可以默认，但是业务中其实很少多数返回一个类型，个人觉得也不合理，用默认值如果忘记写 和你实际不一致会有问题。
