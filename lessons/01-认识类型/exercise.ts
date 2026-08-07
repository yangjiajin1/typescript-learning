/**
 * 第 1 课练习:类型注解与第一次类型检查
 *
 * 运行方式:
 *   npm run lessons/01-认识类型/exercise.ts   # 运行本文件
 *   npm run check                             # 全量类型检查(看报错用这个)
 *
 * 任务 1:给下面的函数参数和返回值加上类型注解。
 *   greet(name: 什么类型, age: 什么类型): 返回什么类型
 *   提示:name 是 string,age 是 number,返回值是 string
 */
export function greet(name, age) {
  return `你好, ${name}, 今年 ${age} 岁`
}

/**
 * 任务 2:故意写一个类型错误(取消下一行注释),运行 npm run check,
 * 观察报错长什么样,把报错抄到本文件的注释里,再删除这行。
 */
// const n: number = "这不是数字"

/**
 * 任务 3:给下面的对象变量加上类型注解。
 * 用接口 interface 定义一个 Movie 类型:title: string, year: number, 可选 rating?: number
 */
const movie = {
  title: "星际穿越",
  year: 2014,
}

/**
 * 任务 4(思考题):下面这两行,哪一行 TS 会报错?为什么?
 * 写答案到注释里,然后取消注释运行 npm run check 验证。
 */
// const a: string = 42
// const b: string = "42"

// 测试输出(不要删)
console.log(greet("张三", 30))
console.log(movie)
