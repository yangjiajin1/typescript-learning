/**
 * 第 4 课练习:interface 与 type——对象类型
 *
 * 运行方式:
 *   npx tsx lessons/04-对象类型/exercise.ts   # 运行本文件
 *   npm run check                             # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   interface 名字 { 属性: 类型 }   → 定义对象形状
 *   type 名字 = { 属性: 类型 }      → 同能力的另一种写法
 *   ?                              → 可选属性(可以不存在)
 *   readonly                       → 只读属性(创建后不能改)
 *   extends                        → 接口继承
 *
 * 任务 1:用 interface 定义 Movie 电影类型。
 *   要求:
 *     - title: string          必填
 *     - year: number           必填
 *     - rating?: number        可选(评分还没出)
 *     - readonly id: number    只读(id 定了不能改)
 *   补全后,写两行验证代码:
 *     1. 创建一部合法的电影对象
 *     2. 尝试给 movie.id 重新赋值 → 运行 npm run check 看报错,再注释掉
 *
 * 任务 2:用 type 别名定义 Order 订单类型。
 *     - id: string             必填
 *     - amount: number         必填
 *     - remark?: string        可选(备注,不一定有)
 *   写一行代码创建订单对象,然后回答:不写 remark 会不会报错?
 *
 * 任务 3:interface 继承 extends。
 *   定义 Documentary(纪录片),extends Movie,额外多一个 director: string。
 *   写代码验证:一个 Documentary 对象既能访问 director,也能访问 title。
 *
 * 任务 4:同义改写 interface ↔ type。
 *   a) 把任务 1 的 Movie 用 type 改写,试试创建对象的代码是否还能用。
 *   b) 用交叉类型模拟继承:type DocumentaryAlias = Movie & { director: string }
 *   c) 思考题(写在注释里):为什么 type 里"继承"要用 & 来模拟?
 *      interface 的 extends 和 type 的 & 在报错信息上有什么不同?
 */

// ===== 任务 1:interface Movie =====
// interface Movie {
//   // 你的类型定义
// }

// 1) 创建一部合法电影
// const movie: Movie = {
// }

// 2) 尝试修改只读属性(观察报错后注释掉)
// movie.id = 999

// ===== 任务 2:type Order =====
// type Order = {
// }

// const order: Order = {
// }
// 结论(不写 remark 会报错吗):____

// ===== 任务 3:interface Documentary extends Movie =====
// interface Documentary extends Movie {
// }

// const doc: Documentary = {
//   // 这里要填哪些属性?思考:doc 现在有哪些属性可用
// }

// ===== 任务 4:同义改写 =====
// a) type 版 Movie
// type MovieAlias = {
// }

// b) 交叉类型模拟继承
// type DocumentaryAlias = Movie & {
// }

// c) 思考(写在注释里):为什么 type 里"继承"要用 & 模拟?
//    interface 的 extends 和 type 的 & 在报错信息上有什么不同?
//    ____

interface Movie {
  title: string
  year: number
  rating?: number
  readonly id: number
}
const movie: Movie = {
  title: '最后的人',
  year: 2024,
  id: 1
}
// movie.id = 123
// Cannot assign to 'id' because it is a read-only property.

type Order = {
  id: string
  amount: number
  remark?: string
}
const order: Order = {
  id: '1',
  amount: 100
}

interface Documentary extends Movie {
  director: string
}
const documentary: Documentary = {
  title: '地球脉动',
  year: 2023,
  id: 2,
  director: '大卫·阿滕伯勒'
}
console.log(documentary.title)
console.log(documentary.director)

type MovieCopy = {
  title: string
  year: number
  rating?: number
  readonly id: number
}

type DocumentaryCopy = MovieCopy & {
  director: string
}
const documentaryCopy: DocumentaryCopy = {
  title: '地球脉动',
  year: 2023,
  id: 3,
  director: '大卫·阿滕伯勒'
}
console.log(documentaryCopy.title)
console.log(documentaryCopy.director) 

// type 不能继承所以要用 & 来模拟继承,报错信息上也会有区别,interface 的 extends 会提示继承的属性类型不匹配,而 type 的 & 会提示类型不兼容.
