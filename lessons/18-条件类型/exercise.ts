/**
 * 第 18 课练习:条件类型与 infer
 *
 * 运行方式:
 *   npx tsx lessons/18-条件类型/exercise.ts   # 运行本文件
 *   npm run check                          # 全量类型检查(看报错用这个)
 *
 * 本课关键词速查:
 *   条件类型    → T extends U ? X : Y     "类型级别的 if/else":T 能赋给 U 走 X,否则走 Y
 *   infer       → 藏在条件类型里的"通配符/占位名":让 TS 去匹配某个类型形状,
 *                 匹配到的部分用 infer R 命名,供真分支使用
 *   形状匹配    → T extends (...args: any) => infer R ? R : any
 *                 意思是:把 T 放到"函数形状"的架子上比一比,比上了就把返回位置截获成 R
 *
 * 核心思维(务必先读懂再动手):
 *   第 17 课你已经会用 ReturnType / Parameters —— 但它们是"魔法黑盒"。
 *   这一课把它们拆开:工具类型 = "类型的函数",里面那个 if/else 就是条件类型。
 *   infer 不是随便能用的关键字,它【只能】出现在条件类型的 extends 右侧,
 *   因为它干的是"在一个形状里挖出一块未知类型并命名"的活 —— 只有先写出形状
 *   (extends 什么),TS 才有地方替你去匹配、去猜。这是本课最重要的一句话。
 */

// ============================================================
// 任务 1:读代码,预测类型(先读后写)
// 每一问先在注释里写预测,再悬停/运行验证。这几问是"读懂条件类型"的体检。
// ============================================================

// ① 条件类型最简单的样子:判断 T 是不是 string
type IsString<T> = T extends string ? true : false
// ①a type A1 = IsString<'hello'>
// 你的预测: true
// ①b type A2 = IsString<42>
// 你的预测: false
// ①c 思考:为什么 'hello' 算"能赋给 string"而 42 不算?这跟普通赋值有什么关系?
// 因为 'hello' 是 string 类型的字面量，而 42 是 number 类型的字面量  多了判断

// ② 内置 ReturnType 的源码(第 17 课用过它,今天看它的"内脏"):
//    type ReturnType<T extends (...args: any) => any> =
//      T extends (...args: any) => infer R ? R : any
// ②a 泛型约束里的 extends 管的是"传进来的 T 必须长什么样"(门槛);
//    条件类型里的 extends 管的是"T 去匹配哪个形状、匹配上走哪支"(岔路口)。
//    拿第 17 课的 ReturnType<typeof fn> 举例,T 在匹配时,TS 从 fn 的签名里
//    截获了哪一部分、给到了 R?一句话说清楚。
//    你的理解: TS 从 fn 的签名里截获了返回值的类型，并将其赋值给 R
// ②b 为什么返回类型写的是 R 而不是 fn 的某个属性?infer R 到底"抓到"了什么?
//    你的理解: 因为 R 是一个占位符，表示匹配到的返回类型，TS 会根据 fn 的签名来推断出 R 的具体类型

// ③ 把参数也截获(练手,先自己猜再验证)
//    仿照 ReturnType,猜 Parameters<T> 内置源码长什么样(提示:返回的是元组)。
//    先写你的猜测,再悬停 Parameters<typeof fn> 验证:
//    type Parameters<T extends (...args: any) => any> = 你的猜测?
//    你的猜测: type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
// ③a 判断:截获参数要写 infer 吗?如果要,它得写成 infer 元组(…args: infer P)?为什么是"元组"而不是"某一类型"?
//  要写 infer 因为要从参数中提取类型   因为参数可能是多个参数 所以是元组

// ============================================================
// 任务 2:你自己写(本课核心,三个都要求不许 any)
// ============================================================

// ① 手写 MyReturnType —— 不许抄,先自己照着"形状匹配"的思路写,写完再对照内置源码。
//    签名已给:type MyReturnType<T extends (...args: any) => any> = ???
//    占位先放 T 只是保证能编译,你要把它换成真正的条件类型。
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

// 验证(类型应等于 number):
type fnRet = MyReturnType<(x: string) => number> // number

// ② 手写 UnwrapPromise —— 把 Promise 拆掉一层拿到内部类型。
//    要求:T 是 Promise<内部> 时,结果是"内部";T 不是 Promise 时,原样返回 T。
//    提示:形状匹配的架子这次是 Promise<...>,infer 挖的是尖括号里的那个。
type UnwrapPromise<T> = T extends Promise<infer R> ? R : T

// 验证(类型应等于 string): 
type Inner = UnwrapPromise<Promise<string>> // string
// 验证(类型应等于 Date,因为它不是 Promise,原样返回): 
type Keep = UnwrapPromise<Date> // Date

// ③ 手写 IsArray —— 判断 T 是不是数组,是给 true,否则给 false。
type IsArray<T> = T extends unknown[] ? true : false

// 验证(下面两个类型应分别为 true / false):
type IsArrYes = IsArray<number[]> // true
type IsArrNo = IsArray<string> // false

// ③-挑战(想做再做,不做不亏):
//    上面 IsArray<string | number[]> 会得到 true 还是 false,还是别的什么?
//    提示:想想第 17 课 Exclude 是怎么能对联合"逐个删"的 —— 联合里的每个成员
//    都会单独过一遍条件类型,再把结果拼回联合。这招叫"分布式条件类型"。
//    你先猜,再定义一个 type test = IsArray<string | number[]> 悬停看结果。
//    你的预测: false
// type test = IsArray<string | number[]> // boolean

// ============================================================
// 任务 3:消费验证
// 类型没法被 console.log 打印(编译后不存在),验证靠"编译期赋值":
// 下面每行【不报错】= 手写的类型取对了;报错 = 没取对,看报错猜哪里歪了。
// 运行(npx tsx ...)只是确认程序不崩 + 打几个真实值。
// ============================================================
const a1: fnRet = 42                       // fnRet 应 = number,才能装下 42
const a2: Inner = '剥出来的字符串'          // Inner 应 = string
const a3: Keep = new Date()                // Keep 应 = Date(原样保留)
const a4: IsArrYes = true                  // true 字面量
const a5: IsArrNo = false                  // false 字面量
console.log('编译期赋值全通过 = 手写类型全对:', a1, a2, a3, a4, a5)

// ============================================================
// 附:裸 T vs 包住 [T] 的对照(讲解后补的复习示例)
//   裸 T + 联合实参 → 分布式:联合拆开逐个过,结果拼回联合
//   包住 [T]      → 关掉分布式:整个联合当整体,一个不达标全盘否
// ============================================================
type AllStr<T> = [T] extends [string] ? true : false   // 包住:整体判断
type AllStr2<T> = T extends string ? true : false      // 裸:分布式
// 悬停看四个结果:
type C1 = AllStr<'a'>          // true  (单个,包不包没差别)
type C2 = AllStr<'a' | 'b'>    // true  (全是 string,整体也塞得进)
type C3 = AllStr<'a' | 42>     // false (整体里混了 42,一票否决)
type C4 = AllStr2<'a' | 42>    // boolean (拆开:'a'→true、42→false,拼回)
